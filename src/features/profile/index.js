// userSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { dashboardApp } from '../../actions/profile'


const initialState = {
  entitiesDashboard: null,
  statusDashboard: "idle",
  error: null,
};

export const dashboardAppSlice = createSlice({
  name: 'dashboardApp',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(dashboardApp.pending, (state, action) => {
        state.statusDashboard = "pending";
        state.entitiesDashboard = null;
      })
      .addCase(dashboardApp.fulfilled, (state, action) => {
        state.statusDashboard = "succeeded";
        state.entitiesDashboard = action.payload
      })
      .addCase(dashboardApp.rejected, (state, action) => {
        state.statusDashboard = "failed";
        state.error = action.payload;
      });
  },
}).reducer