import { ceInputPlugin } from "./ce-input-plugin";


// const prevStr = "1sdf12sd21";
// const str = "z34d1f1212";
// console.log(ceInputPlugin.getUpdatedCaretPos(prevStr, str, 3));

const waveCase = (text: string, ev: InputEvent): string => {
  return text
    .split("")
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");
};
ceInputPlugin.enablePlugin();
ceInputPlugin.registerModifier("waveCase", waveCase);


const pluginToggleBtn = document.querySelector("#toggle-plugin");
let isEnabled = true;
pluginToggleBtn?.addEventListener("click", () => {
  isEnabled = !isEnabled;
  isEnabled 
    ? ceInputPlugin.enablePlugin() 
    : ceInputPlugin.disablePlugin();
  pluginToggleBtn.textContent = isEnabled ? "disable plugin" : "enable plugin";
})