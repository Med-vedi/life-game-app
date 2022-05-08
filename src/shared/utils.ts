interface FindNeighbours {
  x: number;
  y: number;
  cols: number;
  rows: number;
  grid: number[][];
}
interface FindPopulation {
  cols: number;
  rows: number;
  nextGrid: number[][];
}

export function createEmptyGridArr(rows: number, cols: number): number[][] {
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
export const increasePopulation = ({
  cols,
  rows,
  nextGrid,
}: FindPopulation): number => {
  let sum = 0;
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let currentCell = nextGrid[x][y];
      if (currentCell) {
        sum++;
      }
    }
  }
  return sum;
};
