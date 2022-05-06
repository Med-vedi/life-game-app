import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createEmptyGridArr, createRandomGridArr } from "../shared/utils";

type EmptyGrid = {
  grid: number[][];
  rows: number;
  cols: number;
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
  },
});

export const { createEmptyGrid, createRandomGrid } = gridSlice.actions;

export default gridSlice.reducer;
