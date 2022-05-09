import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CellUpdate,
  EmptyGrid,
  Generation,
  GridSize,
  UpdateGrid,
  UploadGrid,
} from "../shared/types";
import {
  createEmptyGridArr,
  createRandomGridArr,
  findAliveNeighbours,
  increasePopulation,
  parseUploadedGrid,
} from "../shared/utils";

const initialState: EmptyGrid = {
  grid: createEmptyGridArr({ cols: 10, rows: 10 }),
  cols: 10,
  rows: 10,
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

      for (let rowIdx = 0; rowIdx < rows; rowIdx++) {
        for (let colIdx = 0; colIdx < cols; colIdx++) {
          // search 3x3 from utils.ts
          let neighbours = findAliveNeighbours({
            rowIdx,
            colIdx,
            cols,
            rows,
            grid,
          });
          let currentCell = grid[rowIdx][colIdx];
          /*
          Game rules in action:
          */
          // Any dead cell with three live neighbours becomes a live cell.
          if (!currentCell && neighbours === 3) {
            nextGrid[rowIdx][colIdx] = 1;
            // Any live cell with two or three live neighbours survives.
          } else if (currentCell && (neighbours === 2 || neighbours === 3)) {
            nextGrid[rowIdx][colIdx] = 1;
          } else {
            // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
            nextGrid[rowIdx][colIdx] = 0;
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

    uploadGrid(state, action: PayloadAction<UploadGrid>) {
      const { payload } = action;
      const { grid } = payload;
      const cols = grid[0].length;
      const rows = grid.length;

      // parse strings "*" and "." values to numbers
      const newGrid = parseUploadedGrid({
        grid,
        cols,
        rows,
      });

      // update the grid
      const population = increasePopulation({ cols, rows, grid: newGrid });

      state.rows = rows;
      state.cols = cols;
      state.grid = newGrid;
      state.population = population;
    },

    increaseGeneration(state) {
      state.generation += 1;
    },
    setGeneration(state, action: PayloadAction<Generation>) {
      state.generation = action.payload.generation;
    },
  },
});

export const {
  createEmptyGrid,
  createRandomGrid,
  updateGrid,
  onGridCellClick,
  increaseGeneration,
  uploadGrid,
  setGeneration,
} = gridSlice.actions;

export default gridSlice.reducer;
