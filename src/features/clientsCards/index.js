// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { clientCardAction } from "../../actions/clients";

const initialState = {
  clientCards: [],
  statusClientCard: "idle",
  errorClient: null,
};

export const clientCardSlice = createSlice({
  name: "clientsCards",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(clientCardAction.pending, (state, action) => {
        state.statusClientCard = "pending";
        state.clientCards = [];
      })
      .addCase(clientCardAction.fulfilled, (state, action) => {
        state.statusClientCard = "succeeded";
        state.clientCards = action.payload;
      })
      .addCase(clientCardAction.rejected, (state, action) => {
        state.statusClientCard = "failed";
        state.errorClient = action;
      });
  },
}).reducer;
