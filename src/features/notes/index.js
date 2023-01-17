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
        if (item.id === action.payload.id) {
          return {
            ...item,
            back: "#E6FFF6",
          };
        } else {
          return {
            ...item,
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
        state.noteTitle =[...action.payload?.data?.mentioned_messages,...action?.payload?.data?.notes].map(
          (e) => {
            return {
              back: "white",
              ...e,
            };
          }
        );
      })
      .addCase(notesAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
});

export const { noteMessageAction } = noteSlice.actions;
export default noteSlice.reducer;
