import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import gridSizeReducer from "./gridSizeSlice";
import gameControlReducer from "./gameControlSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    gridSize: gridSizeReducer,
    gameControl: gameControlReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
