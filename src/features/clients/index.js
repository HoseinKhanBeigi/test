// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { clientsList } from "../../actions/clients";

const initialState = {
  clietList: [],
  statusClient: "idle",
  errorClient: null,
};

export const clientListSlice = createSlice({
  name: "clientsList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(clientsList.pending, (state, action) => {
        state.statusClient = "pending";
        state.clietList = [];
      })
      .addCase(clientsList.fulfilled, (state, action) => {
        state.statusClient = "succeeded";
        state.clietList = action.payload;
      })
      .addCase(clientsList.rejected, (state, action) => {
        state.statusClient = "failed";
        state.errorClient = action;
      });
  },
}).reducer;
