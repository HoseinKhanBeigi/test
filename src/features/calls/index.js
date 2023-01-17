// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { callsList } from "../../actions/calls";

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
      .addCase(callsList.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(callsList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload;
      })
      .addCase(callsList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;
