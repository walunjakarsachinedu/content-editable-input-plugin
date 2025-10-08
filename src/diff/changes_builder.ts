import { Change, Pos } from "./types";

export const changeBuilder = (path: Pos[]): Change[] => {
  const changes: Change[] = [];
  let prevChange: Change|null = null;

  for(let i=1; i<path.length; i++) {
    let {r:pr, c:pc}= path[i-1];
    const {r, c} = path[i];
    const dr = r - pr;
    const dc = c - pc;
    if((dr > 0) != (dc > 0)) {
      if(dr > 0) {
        if(prevChange?.op == "delete") {
          if(prevChange.pos + prevChange.textLength + 1 == r) {
            prevChange.textLength += dr;
          }
        }
        else {
          const change: Change = {op: "delete", pos: pr, textLength: dr};
          changes.push(change);  
          prevChange = change;
        }
      }
      if(dc > 0) {
        if(prevChange?.op == "insert") {
          if(prevChange.pos == r) {
            prevChange.textLength += dc;
          }
        }
        else {
          const change: Change = {op: "insert", pos: pr, textLength: dc};
          changes.push(change);  
          prevChange = change;
        }
      }
    }
    else if(dr > 0 && dc > 0) {
      prevChange = null;
    }
  }

  return changes;
}