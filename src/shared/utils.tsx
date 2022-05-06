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
