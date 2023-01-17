// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { format } from "date-fns-jalali";
import { dashboardApp } from "../../actions/profile";

const initialState = {
  entitiesDashboard: null,
  statusDashboard: "idle",
  error: null,
  areaChartCategories: [],
  areaChartValues: [],
};

export const dashboardAppSlice = createSlice({
  name: "dashboardApp",
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
        state.entitiesDashboard = action.payload;
        const dateOfearaChart = action?.payload.data?.client_segment_chart;
        const categories = [];
        const values = [];
        for (const [key,value] of Object.entries(dateOfearaChart)) {
          categories.push(`${key.slice(5, 7)}`);
          values.push(value);
        }
        state.areaChartCategories = categories;
        state.areaChartValues = values;
      })
      .addCase(dashboardApp.rejected, (state, action) => {
        state.statusDashboard = "failed";
        state.error = action.payload;
      });
  },
}).reducer;
