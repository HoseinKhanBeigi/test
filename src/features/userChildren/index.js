// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { userChildrenAction } from "../../actions/users";

const initialState = {
  entities: [],
  status: "idle",
  error: null,
};

export const userChildrenSlice = createSlice({
  name: "usersChildren",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(userChildrenAction.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(userChildrenAction.fulfilled, (state, action) => {
        if (state.status === "pending") {
          state.status = "succeeded";
          state.entities = action.payload;
        }
      })
      .addCase(userChildrenAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;
