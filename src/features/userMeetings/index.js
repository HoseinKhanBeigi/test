// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { userMeetingsAction } from "../../actions/users";

const initialState = {
  entities: [],
  status: "idle",
  error: null,
};

export const userMeetingSlice = createSlice({
  name: "userMeetings",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(userMeetingsAction.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(userMeetingsAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload;
      })
      .addCase(userMeetingsAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;
