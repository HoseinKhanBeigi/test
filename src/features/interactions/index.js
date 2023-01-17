// userSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { interactions } from '../../actions/interactions'


const initialState = {
  entities: [],
  status: "idle",
  error: null,
};

export const interactionSlice = createSlice({
  name: 'interactions',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(interactions.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(interactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload
      })
      .addCase(interactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;