export interface FindNeighbours {
  rowIdx: number;
  colIdx: number;
  cols: number;
  rows: number;
  grid: number[][];
}
export interface FindPopulation {
  cols: number;
  rows: number;
  grid: number[][];
}
export interface UploadedGrid {
  cols: number;
  rows: number;
  grid: string[][] | number[][];
}

// GAME CONTROL
export enum GameStatus {
  START = "START",
  STOP = "STOP",
}

export enum GridMode {
  RANDOM = "RANDOM",
  CURRENT = "CURRENT",
  EMPTY = "EMPTY",
}

export type GameStatusStrings = keyof typeof GameStatus;
export type GridModeStrings = keyof typeof GridMode;

export type ControlsState = {
  gameStatus: GameStatusStrings;
  gridMode: GridModeStrings;
};

// GRID
export type GridType = number[][] | [];

export type GridSize = {
  rows: number;
  cols: number;
};

export type EmptyGrid = {
  grid: number[][];
  rows: number;
  cols: number;
  generation: number;
  population: number;
};
export type UpdateGrid = {
  grid: number[][];
  x?: number;
  y?: number;
  rows: number;
  cols: number;
};
export type UploadGrid = {
  grid: string[][] | number[][];
  generation: number;
};
export type CellUpdate = {
  grid: number[][];
  x: number;
  y: number;
};
export type Generation = {
  generation: number;
};

export type DownloadText = {
  grid: number[][] | string[][];
  generation: number;
};
