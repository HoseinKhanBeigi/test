// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { clientMeetingsAction } from "../../actions/clients";

const initialState = {
  entities: [],
  status: "idle",
  error: null,
};

export const clientMeetingSlice = createSlice({
  name: "clientMeetingsList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(clientMeetingsAction.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(clientMeetingsAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload;
      })
      .addCase(clientMeetingsAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;
