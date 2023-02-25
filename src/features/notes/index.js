// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { notesAction } from "../../actions/notes";

const initialState = {
  entities: [],
  status: "idle",
  noteTitle: [],
  error: null,
};

const noteSlice = createSlice({
  name: "notesAction",
  initialState,
  reducers: {
    noteMessageAction(state, action) {
      state.noteTitle = state.noteTitle.map((item) => {
        console.log(action?.payload?.id);
        if (Number(item?.idx) === Number(action?.payload?.id)) {
          console.log(action?.payload?.id);
          return {
            ...item,
            status: true,
            back: "#E6FFF6",
          };
        } else {
          return {
            ...item,
            status: false,
            back: "white",
          };
        }
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(notesAction.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(notesAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload;
        state.noteTitle = [
          ...action?.payload?.data?.notes,
          ...action.payload?.data?.mentioned_messages,
        ].map((e) => {
          return {
            ...e,
            back: "white",
            status: false,
            idx: e.note_id ? e.note_id : e.id,
          };
        });
      })
      .addCase(notesAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
});

export const { noteMessageAction } = noteSlice.actions;
export default noteSlice.reducer;
