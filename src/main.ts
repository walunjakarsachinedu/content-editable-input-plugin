import { diff as lcsdiff } from "./lcs_dp_diff";

import { diff } from "./myers_diff";


const prevStr = "1sdf1sd21";
const str = "d1f1212";
console.log(
  `diff(${prevStr}, ${str}) =\n`
);

console.log("diff using lcs dp algorithm →")
console.log(
  lcsdiff(prevStr, str)
);

console.log("diff using myer's diff algorithm →")
console.log(
  diff(prevStr, str)
);


