import { changeBuilder } from "./changes_builder";
import { Change, Pos } from "./types";

const diff = (prevStr: string, str: string): Change[] => {
  const prev: Record<number, Record<number, Pos>> = {};
  let heads: Pos[] = [{r:0, c:0}];

  while(heads.length > 0) {
    const newHeads: Pos[] = [];
    for(let i=0; i<heads.length; i++) {
      const {r, c} = heads[i];
      if(r > prevStr.length || c > str.length) continue;
      if((r == prevStr.length) != (c == str.length)) {
        const cr = (r < prevStr.length) ? r+1 : r;
        const cc = (c < str.length) ? c+1 : c;
        if(prev[cr]?.[cc]) continue;
        prev[cr] ??= {};
        prev[cr][cc] = {r, c};
        newHeads.push({r: cr, c: cc})
      }
      if(r >= prevStr.length || c >= str.length) continue;
      if(prevStr[r] == str[c]) {
        let [cr, cc] = [r+1, c+1];
        /** check is it already used. */
        while(!prev[cr]?.[cc]) {
          prev[cr] ??= {};
          prev[cr][cc] = {r: cr-1, c: cc-1};
          if(cr >= prevStr.length || cc >= str.length || prevStr[cr] != str[cc]) {
            newHeads.push({r: cr, c: cc});
            break;
          }
          ++cr, ++cc;
        }
      }
      else {
        if(!prev[r+1]?.[c]) {
          prev[r+1] ??= {};
          prev[r+1][c] = {r, c};
          newHeads.push({r: r+1, c});
        }
        if(!prev[r]?.[c+1]) {
          prev[r] ??= {};
          prev[r][c+1] = {r, c};
          newHeads.push({r, c: c+1});
        }
      }
    }
    heads = newHeads;
  }

  const path: Pos[] = [];
  let [r, c] = [prevStr.length, str.length];
  while (prev[r]?.[c]) {
    path.push({r, c});
    const {r: cr, c: cc} = prev[r][c];
    r = cr, c = cc;
  }
  path.push({r: 0, c: 0});
  path.reverse();
  
  return changeBuilder(path);
}


export { diff };