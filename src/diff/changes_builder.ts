import { Change, Pos } from "./types";

export const changeBuilder = (path: Pos[]): Change[] => {
  let pr=0, pc=0;
  const changes: Change[] = [];
  let prevChange: Change|null = null;

  for(let i=1; i<path.length; i++) {
    const {r, c} = path[i];
    const dr = r - pr;
    const dc = c - pc;
    if((dr > 0) != (dc > 0)) {
      const cost = Math.max(dr, dc);
      const op = (dr > 0) ? "delete" : "insert";
      if(prevChange?.op == op && prevChange.pos + prevChange.textLength == pr) {
        prevChange.textLength += cost;
      }
      else {
        const change: Change = {op, pos: pr, textLength: cost};
        changes.push(change);  
        prevChange = change;
      }
    }

    pr = r;
    pc = c;
  }

  return changes;
}