// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { usersList } from "../../actions/users";

const initialState = {
  entities: [],
  status: "idle",
  error: null,
};

export const userListSlice = createSlice({
  name: "usersList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(usersList.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(usersList.fulfilled, (state, action) => {
        if (state.status === "pending") {
          state.status = "succeeded";
          state.entities = action.payload;
        }
      })
      .addCase(usersList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;
