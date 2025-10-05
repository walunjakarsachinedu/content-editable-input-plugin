import { changeBuilder } from "./changes_builder";
import { Change, Pos } from "./types";

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
  const next: HelperArgs["next"] = {};
  // run dp & fill next with next optimal step
  helper({prevStr, str, r: 0, c: 0, dp: {[prevStr.length]: {[str.length]: 0}}, next});

  let r=0, c=0;
  const path: Pos[] = [{r: 0, c: 0}];

  while((r <= prevStr.length || c <= str.length) && next[r]?.[c]) {
    const {r: nr, c: nc} = next[r][c];
    r = nr, c = nc;
    path.push({r, c});
  }

  return changeBuilder(path);
};

type HelperArgs = {
  prevStr: string, 
  str: string, 
  /** Idx of prevStr. */
  r: number, 
  /** Idx of str. */
  c: number, 
  /** Used for memoization and choosing optimal path. */
  dp: Record<number, Record<number, number>>,
  /** Track next step optimal step taken. */
  next: Record<number, Record<number, { r: number, c: number }>>
};

const helper = (args: HelperArgs): number => {
  const { prevStr, str, r, c, dp, next } = args;
  dp[r] ??= {};

  if(r > prevStr.length || c > str.length) return Number.MAX_SAFE_INTEGER;
  if(r == prevStr.length && c == str.length) return 0;
  if(dp[r][c] != undefined) return dp[r][c];

  next[r] ??= {};

  if((r == prevStr.length) != (c == str.length)) {
    if(r == prevStr.length) {
      next[r][c] = { r: prevStr.length, c: str.length };
      const insert = str.length - (c + 1);
      return dp[r][c] = insert;
    } 
    else {
      next[r][c] = { r: prevStr.length, c: str.length };
      const remove = prevStr.length - (r + 1);
      return dp[r][c] = remove;
    }
  }

  if(prevStr[r] == str[c]) {
    next[r][c] = {r: r+1, c: c+1};
    return dp[r][c] = helper({...args, r: r+1, c: c+1, });
  }
  const insert = helper({...args, r: r+1, c: c});
  const remove = helper({...args, r: r, c: c+1});

  next[r][c] = (insert < remove) 
    ? {r: r+1, c: c} 
    : next[r][c] = {r: r, c: c+1};
  
  return dp[r][c] = Math.min(insert, remove) + 1;
} 


export { diff };