import { diff as myerDiff } from "./diff/myers_diff";
import { Change } from "./diff/types";

/** Algorithm:
 * 1. calculate diff of changes
 * 2. sum-up total deletion & insert before caret position
 * 3. caret position change = oldCaretPos - (total insertion - total deletion)
 * @returns caret position in new txt.
 */
export const getCaretPos = (oldTxt: string, txt: string, oldCaretPos: number): number => {
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