// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { callsAction } from "../../actions/calls";

const initialState = {
  entities: [],
  status: "idle",
  error: null,
};

export const callListSlice = createSlice({
  name: "callList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(callsAction.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(callsAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload;
      })
      .addCase(callsAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;
