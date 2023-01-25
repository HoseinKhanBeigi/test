// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { InstructionsAdmin } from "../../../actions/admin";

const initialState = {
  entities: [],
  status: "idle",
  error: null,
};

export const instructionsAdminSlice = createSlice({
  name: "instructionsAdmin",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(InstructionsAdmin.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(InstructionsAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload;
      })
      .addCase(InstructionsAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;
