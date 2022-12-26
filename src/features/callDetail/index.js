// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { callsDetail } from "../../actions/calls";

const initialState = {
  callDetails: [],
  statusDetail: "idle",
  errorDetial: null,
};

export const callDetailShow = createSlice({
  name: "clientDetial",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(callsDetail.pending, (state, action) => {
        state.statusDetail = "pending";
        state.callDetails = [];
      })
      .addCase(callsDetail.fulfilled, (state, action) => {
        state.statusDetail = "succeeded";
        state.callDetails = action.payload;
      })
      .addCase(callsDetail.rejected, (state, action) => {
        state.statusDetail = "failed";
        state.errorClient = action;
      });
  },
}).reducer;
