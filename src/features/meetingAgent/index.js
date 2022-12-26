// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { MeetingsDepenAgent } from "../../actions/meetings";

const initialState = {
  MeetingAgents: [],
  statusMeetingAgents: "idle",
  errorMeetingAgents: null,
};

export const MeetingAgentsDepen = createSlice({
  name: "depenMeetingAgent",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(MeetingsDepenAgent.pending, (state, action) => {
        state.statusMeetingAgents = "pending";
        state.MeetingAgents = [];
      })
      .addCase(MeetingsDepenAgent.fulfilled, (state, action) => {
        state.statusMeetingAgents = "succeeded";
        state.MeetingAgents = action.payload;
      })
      .addCase(MeetingsDepenAgent.rejected, (state, action) => {
        state.statusMeetingAgents = "failed";
        state.errorMeetingAgents = action;
      });
  },
}).reducer;
