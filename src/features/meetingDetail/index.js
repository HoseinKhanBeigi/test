// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { meetingDetail } from "../../actions/meetings";

const initialState = {
  meetingDetails: [],
  statusDetail: "idle",
  errorDetial: null,
};

export const meetingDetailShow = createSlice({
  name: "detailMeeting",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(meetingDetail.pending, (state, action) => {
        state.statusDetail = "pending";
        state.meetingDetails = [];
      })
      .addCase(meetingDetail.fulfilled, (state, action) => {
        state.statusDetail = "succeeded";
        state.meetingDetails = action.payload;
      })
      .addCase(meetingDetail.rejected, (state, action) => {
        state.statusDetail = "failed";
        state.errorClient = action;
      });
  },
}).reducer;
