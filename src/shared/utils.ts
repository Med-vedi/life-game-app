import { GridSize } from "./types";

interface FindNeighbours {
  rowIdx: number;
  colIdx: number;
  cols: number;
  rows: number;
  grid: number[][];
}
interface FindPopulation {
  cols: number;
  rows: number;
  grid: number[][];
}
interface UploadedGrid {
  cols: number;
  rows: number;
  grid: string[][] | number[][];
}

export function createEmptyGridArr({ cols, rows }: GridSize): number[][] {
  const arr = [];
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < cols; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}
export function createRandomGridArr({ cols, rows }: GridSize): number[][] {
  const arr = [];
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < cols; j++) {
      arr[i][j] = Math.random() < 0.5 ? 0 : 1;
    }
  }
  return arr;
}

export function parseUploadedGrid({
  grid,
  cols,
  rows,
}: UploadedGrid): number[][] {
  const arr = [];
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < cols; j++) {
      arr[i][j] = grid[i][j] === "*" ? 1 : 0;
    }
  }
  return arr;
}

export const findAliveNeighbours = ({
  rowIdx,
  colIdx,
  cols,
  rows,
  grid,
}: FindNeighbours): number => {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      // backmail the grid size limits
      let row = (rowIdx + i + rows) % rows;
      let col = (colIdx + j + cols) % cols;

      sum += grid[row][col];
    }
  }
  sum -= grid[rowIdx][colIdx];
  return sum;
};
export const increasePopulation = ({
  cols,
  rows,
  grid,
}: FindPopulation): number => {
  let sum = 0;

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      let currentCell = grid[x][y];
      if (currentCell) {
        sum++;
      }
    }
  }
  return sum;
};
