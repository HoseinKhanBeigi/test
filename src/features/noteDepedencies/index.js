// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { messageDepedencies } from "../../actions/notes";

const initialState = {
  entitiesDependencies: [],
  statusDependencies: "idle",
  error: null,
};

const noteDependencies = createSlice({
  name: "messageDependencies",
  initialState,
  reducers: {
    removeDependencies(state) {
      state.entitiesDependencies = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(messageDepedencies.pending, (state, action) => {
        state.statusDependencies = "pending";
        state.entitiesDependencies = [];
      })
      .addCase(messageDepedencies.fulfilled, (state, action) => {
        state.statusDependencies = "succeeded";
        state.entitiesDependencies = action.payload;
      })
      .addCase(messageDepedencies.rejected, (state, action) => {
        state.statusDependencies = "failed";
        state.error = action;
      });
  },
});

export const { removeDependencies } = noteDependencies.actions;
export default noteDependencies.reducer;
