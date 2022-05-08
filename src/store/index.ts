import { configureStore } from "@reduxjs/toolkit";
import gridSizeReducer from "./gridSizeSlice";
import gameControlReducer from "./gameControlSlice";
import gridReducer from "./gridSlice";

const store = configureStore({
  reducer: {
    gridSize: gridSizeReducer,
    gameControl: gameControlReducer,
    grid: gridReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
