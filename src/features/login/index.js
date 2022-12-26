// loginSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../../actions/login";

const initialState = {
  status: "idle",
  userInfo: null,
  userToken:"",
  error: null,
  access_token:""
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.status = "pending";
        state.userInfo = [];
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInfo = action.payload;
        state.userToken = action.payload.userToken;
        state.access_token = action.payload.data.access_token;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
}).reducer;
