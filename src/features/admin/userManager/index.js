// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { UserManagerAction } from "../../../actions/admin";

const initialState = {
  entities: [],
  status: "idle",
  error: null,
};

export const userManagerSlice = createSlice({
  name: "userManager",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(UserManagerAction.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(UserManagerAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload;
      })
      .addCase(UserManagerAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;
