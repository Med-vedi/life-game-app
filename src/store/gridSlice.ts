import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createEmptyGridArr,
  createRandomGridArr,
  findAliveNeighbours,
} from "../shared/utils";

type EmptyGrid = {
  grid: number[][];
  rows: number;
  cols: number;
};
type UpdateGrid = {
  grid: number[][];
  x?: number;
  y?: number;
  rows: number;
  cols: number;
};
type CellUpdate = {
  grid: number[][];
  x: number;
  y: number;
};

type Grid = {
  rows: number;
  cols: number;
};

const initialState: EmptyGrid = {
  grid: createEmptyGridArr(30, 30),
  rows: 30,
  cols: 30,
};

const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    createEmptyGrid(state, action: PayloadAction<Grid>) {
      state.grid = createEmptyGridArr(action.payload.cols, action.payload.rows);
    },
    createRandomGrid(state, action: PayloadAction<Grid>) {
      state.grid = createRandomGridArr(
        action.payload.cols,
        action.payload.rows
      );
    },
    updateGrid(state, action: PayloadAction<UpdateGrid>) {
      const { payload } = action;
      const { grid, cols = 30, rows = 30 } = payload;

      let nextGrid = createEmptyGridArr(rows, cols);
      // verify by 3x3 square
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          let neighbours = findAliveNeighbours({ x, y, cols, rows, grid });

          let currentCell = grid[x][y];

          if (currentCell) {
            // dispatch(increasePopulation());
          }
          /*
          Game rules in action:
        */
          // Any dead cell with three live neighbours becomes a live cell.

          if (!currentCell && neighbours === 3) {
            nextGrid[x][y] = 1;
            // Any live cell with two or three live neighbours survives.
          } else if (currentCell && (neighbours === 2 || neighbours === 3)) {
            nextGrid[x][y] = 1;
          } else {
            // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
            nextGrid[x][y] = 0;
          }
        }
      }
      state.grid = nextGrid;
    },

    onGridCellClick(state, action: PayloadAction<CellUpdate>) {
      const { payload } = action;
      const { x = 0, y = 0, grid } = payload;

      // deep clone of actual grid
      const newGrid = grid.map((cols) => [...cols]);
      // cell toggle
      if (newGrid[x][y]) {
        newGrid[x][y] = 0;
      } else {
        newGrid[x][y] = 1;
      }
      // update the grid
      state.grid = newGrid;
    },
  },
});

export const {
  createEmptyGrid,
  createRandomGrid,
  updateGrid,
  onGridCellClick,
} = gridSlice.actions;

export default gridSlice.reducer;
