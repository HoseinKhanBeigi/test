// userSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { profile } from '../../actions/profile'


const initialState = {
  entities: null,
  status: "idle",
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(profile.pending, (state, action) => {
        state.status = "pending";
        state.entities = null;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload
      })
      .addCase(profile.rejected, (state, action) => {

        state.status = "failed";
        state.error = action.payload.response;
      });
  },
});
export default profileSlice.reducer