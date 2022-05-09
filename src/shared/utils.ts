import { DownloadText, GridSize } from "./types";
import { saveAs } from "file-saver";

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

export const exportFile = ({ grid, generation }: any): any => {
  const arr = [];
  const cols = grid[0].length;
  const rows = grid.length;
  let strResult = `Generation ${generation}:\n${rows} ${cols}\n`;

  for (let i = 0; i < grid.length; i++) {
    arr[i] = new Array(grid.length);
    for (let j = 0; j < grid[0].length; j++) {
      arr[i][j] = grid[i][j] ? "*" : ".";
    }
  }

  for (let k = 0; k < arr.length; k++) {
    strResult += `${arr[k].join("")}\n`;
  }
  const blob = new Blob([strResult], { type: "text/plain;charset=utf-8" });
  saveAs(blob, `generation${generation}.txt`);
};
