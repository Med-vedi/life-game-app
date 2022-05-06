export interface IGridDimension {
  rows: number;
  cols: number;
}

export type GridType = number[][] | [];

export enum BtnLabel {
  STOP = "STOP",
  START = "START",
  RESET = "RESET",
  RANDOM = "RANDOM",
}
