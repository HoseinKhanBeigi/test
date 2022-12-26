// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { meetingsDepen } from "../../actions/meetings";

const initialState = {
  entities: [],
  status: "idle",
  error: null,
};

export const meetingDepen = createSlice({
  name: "depenMeeting",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(meetingsDepen.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(meetingsDepen.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload;
      })
      .addCase(meetingsDepen.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;
