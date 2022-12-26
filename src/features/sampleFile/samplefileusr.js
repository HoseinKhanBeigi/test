// userSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { userSampleFile } from '../../actions/users'


const initialState = {
  entities: [],
  status: "idle",
  error: null,
};

export const sampleFileusr = createSlice({
  name: 'usersampleFile',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(userSampleFile.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(userSampleFile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload
      })
      .addCase(userSampleFile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;