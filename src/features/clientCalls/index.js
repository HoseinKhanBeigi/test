// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { clientCallsAction } from "../../actions/clients";

const initialState = {
  entities: [],
  status: "idle",
  error: null,
};

export const clientCallsSlice = createSlice({
  name: "clientCallsList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(clientCallsAction.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(clientCallsAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload;
      })
      .addCase(clientCallsAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;
