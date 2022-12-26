// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { callsDepen } from "../../actions/calls";

const initialState = {
  entities: [],
  status: "idle",
  error: null,
};

export const callDepen = createSlice({
  name: "depenCalls",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(callsDepen.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(callsDepen.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload;
      })
      .addCase(callsDepen.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;
