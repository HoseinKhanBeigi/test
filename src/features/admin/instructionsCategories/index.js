// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { InstructionCategoriesAction } from "../../../actions/admin";

const initialState = {
  instructionCategories: [],
  statusCategories: "idle",
  error: null,
};

export const InstructionCategoriesSlice = createSlice({
  name: "instructionsCategories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(InstructionCategoriesAction.pending, (state, action) => {
        state.statusCategories = "pending";
        state.instructionCategories = [];
      })
      .addCase(InstructionCategoriesAction.fulfilled, (state, action) => {
        state.statusCategories = "succeeded";
        state.instructionCategories = action.payload?.data;
      })
      .addCase(InstructionCategoriesAction.rejected, (state, action) => {
        state.statusCategories = "failed";
        state.error = action;
      });
  },
}).reducer;
