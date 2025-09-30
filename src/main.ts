const input = "1,0000"; 
const caretPos = 3;

/** format number string by inserting comma */
const format = (num: string): string => {
  let onlyNumber = num.replaceAll(/[^0-9]/g, "");

  if(onlyNumber.length <= 3) return onlyNumber;

  let formattedNumber = onlyNumber.split("");
  let size = formattedNumber.length;
  for(let i=3; i<size; i+=2) formattedNumber.splice(size-i, 0, ",");
  
  return formattedNumber.join("");
} 

type Change = {
  op: "insert" | "delete",
  textLength: number,
  /** index before any modification in prevStr. */ 
  pos: number, 
};

/** 
e.g., 
  prevStr: "1slkj0,0000", str: "1,00,000" 

output: 
```ts
  [ 
    { op: "delete", textLength: 4, pos: 2 }, 
    { op: "insert", textLength: 1, pos: 5 }, 
    { op: "delete", textLength: 1, pos: 6 }, 
    { op: "insert", textLength: 1, pos: 8 },
  ]
```

Algorithm :-
1. draw dp 2d table with y axis represent prevText and x axis represent current text
2. cost/meaning of movement in grid
    - move down → meaning: delete and cost: 1
    - move right → meaning: insert and cost: 1
    - move diagonal → meaning: keep and cost: 0
3. we start from top left corner and goal is to move to bottom right corner at minimum cost
4. return changes in minimum cost path.

Optimization to consider :-
1. if caret position is k in the new string, you only need to align prevStr[0..*] with str[0..k]. anything after k doesn't matter.
    → reduces dp table from m*n to m*k.
2. in many input cases, prefix and suffix are unchanged. you can trim matching prefix and suffix first, then run DP only on the middle differing region.
    → often reduces input size a lot.
*/
const diff = (prevStr: string, str: string): Change[] => {
  const dp = {}; 
  /** Idx of prevStr. */
  let i=0;
  /** Idx of str. */
  let j=0;

  return helper({prevStr, str, r: 0, c: 0, dp: {}});
};

type HelperArgs = {
  prevStr: string, 
  str: string, 
  /** Idx of prevStr. */
  r: number, 
  /** Idx of str. */
  c: number, 
  /** Used for memoization and choosing optimal path. */
  dp: Record<number, Record<number, number>>
};

const helper = (args: HelperArgs): Change[] => {
  const { prevStr, str, r, c, dp } = args;
  /** represent prevStr.length */
  let height = prevStr.length;
  /** represent str.length */
  let width = str.length;

  if(prevStr[r] == str[c]) {
    const diagnoal = helper({...args, r: r+1, c: c+1});
  }
  const insert = helper({...args, r: r+1, c: c})
  const remove = helper({...args, r: r, c: c+1})

  return [];
} 

console.log(diff("1slkj0,0000", "1,00,000"));


