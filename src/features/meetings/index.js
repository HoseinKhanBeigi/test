// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { meetingsList } from "../../actions/meetings";

const initialState = {
  entities: [],
  status: "idle",
  error: null,
};

export const meetingListSlice = createSlice({
  name: "meetingList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(meetingsList.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(meetingsList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload;
      })
      .addCase(meetingsList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;
