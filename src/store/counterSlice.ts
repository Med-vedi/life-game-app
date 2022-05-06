import { createSlice } from "@reduxjs/toolkit";

type CounterState = {
  generation: number;
  population: number;
};

const initialState: CounterState = {
  generation: 0,
  population: 0,
};
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updateGeneration(state) {
      state.generation += 1;
    },
    resetGeneration(state) {
      state.generation = 0;
    },

    increasePopulation(state) {
      state.population += 1;
    },
    decreasePopulation(state) {
      state.population -= 1;
    },
    resetPopulation(state) {
      state.population = 0;
    },
  },
});

export const {
  updateGeneration,
  resetGeneration,
  increasePopulation,
  decreasePopulation,
  resetPopulation,
} = counterSlice.actions;

export default counterSlice.reducer;
