// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { clientSearch } from "../../actions/clients";

const initialState = {
  clietList: [],
  statusClient: "idle",
  errorClient: null,
};

export const clientSearchSlice = createSlice({
  name: "clientSearch",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(clientSearch.pending, (state, action) => {
        state.statusClient = "pending";
        state.clietList = [];
      })
      .addCase(clientSearch.fulfilled, (state, action) => {
        state.statusClient = "succeeded";
        state.clietList = action.payload;
      })
      .addCase(clientSearch.rejected, (state, action) => {
        state.statusClient = "failed";
        state.errorClient = action;
      });
  },
}).reducer;
