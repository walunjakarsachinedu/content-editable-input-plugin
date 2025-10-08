import { diff as myerDiff } from "./diff/myers_diff";
import { Change } from "./diff/types";
import { numberFormatter } from "./formatters/number_formatter";


class CEInputPlugin {
  readonly modifiers: Record<string, (str: string) => string> = {
    numberFormatter
  };

  enablePlugin() {
    document.addEventListener("input", this._onInputChange);
  }
  
  disablePlugin() {
    document.removeEventListener("input", this._onInputChange);
  }

  registerModifier(name: string, fn: (str: string) => string) {
    this.modifiers[name] = fn;
  }

  _onInputChange = (ev: InputEvent) => {
    const target = ev.target as HTMLElement | null;
    if (!target || !target.hasAttribute("ce-input")) return;

    const oldTxt = target.textContent ?? "";
    const modsAttr = target.getAttribute("ce-input") ?? "";
    const mods = modsAttr.split(",").map(m => m.trim()).filter(Boolean);

    const validModifiers = mods
      .filter(m => m in this.modifiers)
      .map(m => this.modifiers[m]);

    if (validModifiers.length === 0) return;

    let newTxt = oldTxt;
    for (const modFn of validModifiers) newTxt = modFn(newTxt);

    if (newTxt === oldTxt) return;

    const oldCaretPos = this._getCaretPos();

    target.textContent = newTxt;

    if(!oldCaretPos) return;

    const newCaretPos = this.getUpdatedCaretPos(oldTxt, newTxt, oldCaretPos);
    this._setCaretAt(target.firstChild ?? target, newCaretPos);
  }

  _setCaretAt = (el: Node, idx: number) => {
    const newRange = document.createRange();
    newRange.setStart(el, Math.min(idx, el.textContent?.length ?? 0));
    newRange.collapse(true);

    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(newRange);
  }

  _getCaretPos = () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    return range.startOffset;
  }


  /** Algorithm:
   * 1. calculate diff of changes
   * 2. sum-up total deletion & insert before caret position
   * 3. caret position change = oldCaretPos - (total insertion - total deletion)
   * @returns caret position in new txt.
   */
  getUpdatedCaretPos = (oldTxt: string, txt: string, oldCaretPos: number): number => {
    const changes: Change[] = myerDiff(oldTxt, txt);
    let delta = 0;

    for (const ch of changes) {
      if (ch.op === "insert") {
        if (ch.pos <= oldCaretPos) {
          delta += ch.textLength;
        }
      } else {
        const delStart = ch.pos;
        const delEnd = ch.pos + ch.textLength;

        if(delStart < oldCaretPos) {
          if (delEnd <= oldCaretPos) {
            delta -= ch.textLength;
          } else {
            delta -= (oldCaretPos - delStart);
          }
        }
      }
    }

    let newPos = oldCaretPos + delta;

    if (newPos < 0) newPos = 0;
    if (newPos > txt.length) newPos = txt.length;

    return newPos;
  }

}


export const ceInputPlugin = new CEInputPlugin();