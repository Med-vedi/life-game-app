import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CellUpdate, EmptyGrid, GridSize, UpdateGrid } from "../shared/types";
import {
  createEmptyGridArr,
  createRandomGridArr,
  findAliveNeighbours,
  increasePopulation,
} from "../shared/utils";

const initialState: EmptyGrid = {
  grid: createEmptyGridArr({ cols: 30, rows: 30 }),
  cols: 30,
  rows: 30,
  generation: 0,
  population: 0,
};

const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    createEmptyGrid(state, action: PayloadAction<GridSize>) {
      const { payload } = action;
      const { cols, rows } = payload;

      state.generation = 0;
      state.population = 0;
      state.grid = createEmptyGridArr({ cols, rows });
      state.cols = action.payload.cols;
      state.rows = action.payload.rows;
    },
    createRandomGrid(state, action: PayloadAction<GridSize>) {
      const { payload } = action;
      const { cols, rows } = payload;

      state.generation = 0;
      state.population = 0;

      const nextGrid = createRandomGridArr({ cols, rows });
      state.grid = nextGrid;

      const population = increasePopulation({
        cols: payload.cols,
        rows: payload.rows,
        grid: nextGrid,
      });
      state.population = population;
    },

    updateGrid(state, action: PayloadAction<UpdateGrid>) {
      const { payload } = action;
      const { grid, cols, rows } = payload;

      state.population = 0;

      let nextGrid = createEmptyGridArr({ cols, rows });

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
      const population = increasePopulation({ cols, rows, grid: nextGrid });
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
