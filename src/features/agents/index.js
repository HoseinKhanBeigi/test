// userSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { AgentsAction } from '../../actions/agents'


const initialState = {
  entities: [],
  status: "idle",
  error: null,
};

export const agentsSlice = createSlice({
  name: 'AgentsList',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(AgentsAction.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(AgentsAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload
      })
      .addCase(AgentsAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;