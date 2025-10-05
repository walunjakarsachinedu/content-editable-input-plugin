export type Pos = {r: number, c: number};

export type Change = {
  op: "insert" | "delete",
  textLength: number,
  /** index before any modification in prevStr. */ 
  pos: number, 
};