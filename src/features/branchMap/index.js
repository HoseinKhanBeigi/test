// userSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { searchInMap } from '../../actions/reports'


const initialState = {
  entities: [],
  status: "idle",
  error: null,
};

export const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(reportsAction.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(reportsAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload
      })
      .addCase(reportsAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;