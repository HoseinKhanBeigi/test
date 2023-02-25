// userSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { clientAgentsAction } from '../../actions/clients'


const initialState = {
  entities: [],
  status: "idle",
  error: null,
};

export const ClientAgentsSlice = createSlice({
  name: 'clientAgentList',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(clientAgentsAction.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(clientAgentsAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload
      })
      .addCase(clientAgentsAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;