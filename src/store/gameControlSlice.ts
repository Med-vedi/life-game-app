import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ControlsState } from "../shared/types";

const initialState: ControlsState = {
  gameStatus: "STOP",
  gridMode: "EMPTY",
};

const controlsStateSlice = createSlice({
  name: "gameStatus",
  initialState,
  reducers: {
    startGame(state, action: PayloadAction<ControlsState>) {
      state.gameStatus = action.payload.gameStatus;
      state.gridMode = action.payload.gridMode;
    },
    stopGame(state, action: PayloadAction<ControlsState>) {
      state.gameStatus = action.payload.gameStatus;
      state.gridMode = action.payload.gridMode;
    },
    resetGrid(state, action: PayloadAction<ControlsState>) {
      state.gameStatus = action.payload.gameStatus;
      state.gridMode = action.payload.gridMode;
    },
    randomGrid(state, action: PayloadAction<ControlsState>) {
      state.gameStatus = action.payload.gameStatus;
      state.gridMode = action.payload.gridMode;
    },
  },
});

export const { startGame, stopGame, resetGrid, randomGrid } =
  controlsStateSlice.actions;

export default controlsStateSlice.reducer;
