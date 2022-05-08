interface FindNeighbours {
  x: number;
  y: number;
  cols: number;
  rows: number;
  grid: number[][];
}

export function createEmptyGridArr(cols: number, rows: number): number[][] {
  const arr = [];
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < cols; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}
export function createRandomGridArr(rows: number, cols: number): number[][] {
  const arr = [];
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < cols; j++) {
      arr[i][j] = Math.random() < 0.5 ? 0 : 1;
    }
  }
  return arr;
}

export const findAliveNeighbours = ({
  x,
  y,
  cols,
  rows,
  grid,
}: FindNeighbours): number => {
  let sum = 0;

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      // backmail the grid size limits
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }

  sum -= grid[x][y];
  return sum;
};
