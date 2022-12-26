// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { userDetail } from "../../actions/users";

const initialState = {
  userDetails: [],
  statusDetail: "idle",
  errorDetial: null,
};

const userDetailShow = createSlice({
  name: "userDetail",
  initialState,
  reducers: {
    removeState(state) {
      state.userDetails = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userDetail.pending, (state, action) => {
        state.statusDetail = "pending";
        state.userDetails = [];
      })
      .addCase(userDetail.fulfilled, (state, action) => {
        state.statusDetail = "succeeded";
        state.userDetails = action.payload;
      })
      .addCase(userDetail.rejected, (state, action) => {
        state.statusDetail = "failed";
        state.errorClient = action;
      });
  },
});

export const { removeState } = userDetailShow.actions;
export default userDetailShow.reducer;
