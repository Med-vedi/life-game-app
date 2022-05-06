import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum GameStatus {
  START = "START",
  STOP = "STOP",
}

export enum GridMode {
  RANDOM = "RANDOM",
  CURRENT = "CURRENT",
  EMPTY = "EMPTY",
}

type GameStatusStrings = keyof typeof GameStatus;
type GridModeStrings = keyof typeof GridMode;

type ControlsState = {
  gameStatus: GameStatusStrings;
  gridMode: GridModeStrings;
};

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
