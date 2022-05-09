import { configureStore } from "@reduxjs/toolkit";
import gameControlReducer from "./gameControlSlice";
import gridReducer from "./gridSlice";

const store = configureStore({
  reducer: {
    gameControl: gameControlReducer,
    grid: gridReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
