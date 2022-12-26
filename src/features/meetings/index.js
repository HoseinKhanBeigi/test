// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { meetingsAction } from "../../actions/meetings";

const initialState = {
  entities: [],
  status: "idle",
  error: null,
};

export const meetingListSlice = createSlice({
  name: "meetingList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(meetingsAction.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(meetingsAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload;
      })
      .addCase(meetingsAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;
