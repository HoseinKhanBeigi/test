// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { clientsNote } from "../../../actions/notes";

const initialState = {
  entities: [],
  status: "idle",
  error: null,
};

export const clientNoteSlice = createSlice({
  name: "clientsNotesList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(clientsNote.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(clientsNote.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload;
      })
      .addCase(clientsNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;
