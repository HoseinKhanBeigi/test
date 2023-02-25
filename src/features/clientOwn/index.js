// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { ownClientsAction } from "../../actions/clients";

const initialState = {
  entities: [],
  status: "idle",
  errorClient: null,
};

export const clientOwnSlice = createSlice({
  name: "clientsown",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(ownClientsAction.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(ownClientsAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload;
      })
      .addCase(ownClientsAction.rejected, (state, action) => {
        state.status = "failed";
        state.errorClient = action;
      });
  },
}).reducer;
