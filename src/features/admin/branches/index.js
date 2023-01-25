// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { BranchesAction } from "../../../actions/admin";

import { createAction } from "@reduxjs/toolkit";

export const idle = createAction();

const initialState = {
  entities: [],
  status: "idle",
  error: null,
};

export const branchesSlice = createSlice({
  name: "branchesList",
  initialState,
  reducers: {
   
  },
  extraReducers(builder) {
    builder
      .addCase(BranchesAction.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(BranchesAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload;
      })
      .addCase(BranchesAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;
