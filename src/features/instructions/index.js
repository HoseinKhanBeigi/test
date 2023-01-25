// userSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { instructionsAction } from '../../actions/instructions'


const initialState = {
  entities: [],
  status: "idle",
  error: null,
};

export const instructionsSlice = createSlice({
  name: 'instructionsList',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(instructionsAction.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(instructionsAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload
      })
      .addCase(instructionsAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;