import { ceInputPlugin } from "./ce-input-plugin";


// const prevStr = "1sdf12sd21";
// const str = "z34d1f1212";
// console.log(ceInputPlugin.getUpdatedCaretPos(prevStr, str, 3));


ceInputPlugin.enablePlugin();


const pluginToggleBtn = document.querySelector("#toggle-plugin");
let isEnabled = true;
pluginToggleBtn?.addEventListener("click", () => {
  isEnabled = !isEnabled;
  isEnabled 
    ? ceInputPlugin.enablePlugin() 
    : ceInputPlugin.disablePlugin();
  pluginToggleBtn.textContent = isEnabled ? "disable plugin" : "enable plugin";
})