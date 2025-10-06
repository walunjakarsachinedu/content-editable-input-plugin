import { getCaretPos } from "./caret";
import { diff } from "./diff/myers_diff";


const prevStr = "1sdf12sd21";
const str = "z34d1f1212";
console.log(
  `diff(${prevStr}, ${str}) =\n`
);

console.log("diff using myer's diff algorithm →")
console.log(
  diff(prevStr, str)
);


console.log(
  `getCaretPos(${prevStr}, ${str}, 3)`, 
  getCaretPos(prevStr, str, 3)
);


