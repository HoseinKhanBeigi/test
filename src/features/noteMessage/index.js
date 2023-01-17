// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { messageNoteAction } from "../../actions/notes";

const initialState = {
  messagesNote: [],
  statusMessage: "idle",
  errorMessage: null,
};

const messageNoteSlice = createSlice({
  name: "noteMessage",
  initialState,
  reducers: {
    removeMessageNote(state){
      state.messagesNote = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(messageNoteAction.pending, (state, action) => {
        state.statusMessage = "pending";
        state.messagesNote = [];
      })
      .addCase(messageNoteAction.fulfilled, (state, action) => {
        state.statusMessage = "succeeded";
        state.messagesNote = action.payload;
      })
      .addCase(messageNoteAction.rejected, (state, action) => {
        state.statusMessage = "failed";
        state.errorMessage = action;
      });
  },
});

export const { removeMessageNote } = messageNoteSlice.actions;
export default messageNoteSlice.reducer;
