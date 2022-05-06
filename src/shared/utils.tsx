export function createEmptyGridArr(cols: number, rows: number) {
  const arr = [];
  for (let i = 0; i < cols; i++) {
    arr[i] = new Array(cols);
    for (let j = 0; j < rows; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}
export function createRandomGridArr(cols: number, rows: number) {
  const arr = [];
  for (let i = 0; i < cols; i++) {
    arr[i] = new Array(cols);
    for (let j = 0; j < rows; j++) {
      arr[i][j] = Math.random() < 0.5 ? 0 : 1;
    }
  }
  return arr;
}
