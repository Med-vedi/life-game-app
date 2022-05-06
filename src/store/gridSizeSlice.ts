import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GridSizeState = {
  rows: number;
  cols: number;
};

const initialState: GridSizeState = {
  rows: 30,
  cols: 30,
};
const gridSlice = createSlice({
  name: "gridSize",
  initialState,
  reducers: {
    updateGridSize(state, action: PayloadAction<GridSizeState>) {
      state.rows = action.payload.rows;
      state.cols = action.payload.cols;
    },
  },
});

export const { updateGridSize } = gridSlice.actions;

export default gridSlice.reducer;
