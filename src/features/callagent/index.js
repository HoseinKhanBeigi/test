// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { callsDepenAgent } from "../../actions/calls";

const initialState = {
  callAgents: [],
  statuscallAgents: "idle",
  errorcallAgents: null,
};

export const callAgentsDepen = createSlice({
  name: "depencallAgent",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(callsDepenAgent.pending, (state, action) => {
        state.statuscallAgents = "pending";
        state.callAgents = [];
      })
      .addCase(callsDepenAgent.fulfilled, (state, action) => {
        state.statuscallAgents = "succeeded";
        state.callAgents = action.payload;
      })
      .addCase(callsDepenAgent.rejected, (state, action) => {
        state.statuscallAgents = "failed";
        state.errorcallAgents = action;
      });
  },
}).reducer;
