import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createEmptyGridArr,
  createRandomGridArr,
  findAliveNeighbours,
  increasePopulation,
} from "../shared/utils";

type EmptyGrid = {
  grid: number[][];
  rows: number;
  cols: number;
  generation: number;
  population: number;
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
  generation: 0,
  population: 0,
};

const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    createEmptyGrid(state, action: PayloadAction<Grid>) {
      state.generation = 0;
      state.population = 0;
      state.grid = createEmptyGridArr(action.payload.cols, action.payload.rows);
    },
    createRandomGrid(state, action: PayloadAction<Grid>) {
      state.generation = 0;
      state.population = 0;
      state.grid = createRandomGridArr(
        action.payload.cols,
        action.payload.rows
      );
    },
    updateGrid(state, action: PayloadAction<UpdateGrid>) {
      const { payload } = action;
      const { grid, cols = 30, rows = 30 } = payload;
      state.population = 0;

      let nextGrid = createEmptyGridArr(rows, cols);

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          // search 3x3 from utils.ts
          let neighbours = findAliveNeighbours({ x, y, cols, rows, grid });
          let currentCell = grid[x][y];
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
      const population = increasePopulation({ cols, rows, nextGrid });
      state.population = population;
      state.grid = nextGrid;
      state.generation++;
    },

    onGridCellClick(state, action: PayloadAction<CellUpdate>) {
      const { payload } = action;
      const { x = 0, y = 0, grid } = payload;

      // deep clone of actual grid
      const newGrid = grid.map((cols) => [...cols]);
      // cell toggle
      if (newGrid[x][y]) {
        newGrid[x][y] = 0;
        state.population--;
      } else {
        newGrid[x][y] = 1;
        state.population++;
      }
      // update the grid
      state.grid = newGrid;
    },

    increaseGeneration(state) {
      state.generation += 1;
    },
  },
});

export const {
  createEmptyGrid,
  createRandomGrid,
  updateGrid,
  onGridCellClick,
  increaseGeneration,
} = gridSlice.actions;

export default gridSlice.reducer;
