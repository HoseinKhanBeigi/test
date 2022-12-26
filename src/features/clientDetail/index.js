// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { clientDetail } from "../../actions/clients";

const initialState = {
  clientDetails: [],
  statusDetail: "idle",
  errorDetial: null,
};

export const clientDetailShow = createSlice({
  name: "clientDetial",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(clientDetail.pending, (state, action) => {
        state.statusDetail = "pending";
        state.clientDetails = [];
      })
      .addCase(clientDetail.fulfilled, (state, action) => {
        state.statusDetail = "succeeded";
        state.clientDetails = action.payload;
      })
      .addCase(clientDetail.rejected, (state, action) => {
        state.statusDetail = "failed";
        state.errorClient = action;
      });
  },
}).reducer;
