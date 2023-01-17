// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { meetingDependencies } from "../../actions/meetings";

const initialState = {
  meetingEntities: [],
  statusMeetingEntities: "idle",
  errorMeetingEntities: null,
};

export const meetingDependenciesSlice = createSlice({
  name: "depenMeeting",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(meetingDependencies.pending, (state, action) => {
        state.statusMeetingEntities = "pending";
        state.meetingEntities = [];
      })
      .addCase(meetingDependencies.fulfilled, (state, action) => {
        state.statusMeetingEntities = "succeeded";
        state.meetingEntities = action.payload;
      })
      .addCase(meetingDependencies.rejected, (state, action) => {
        state.statusMeetingEntities = "failed";
        state.errorMeetingEntities = action;
      });
  },
}).reducer;
