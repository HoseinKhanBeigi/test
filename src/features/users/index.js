// userSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { usersList } from '../../actions/users'


const initialState = {
  entities: [],
  status: "idle",
  error: null,
};

const userListSlice = createSlice({
  name: 'usersList',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(usersList.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(usersList.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action);
        state.entities = action.payload
      })
      .addCase(usersList.rejected, (state, action) => {
        console.log(action);
        state.status = "failed";
        state.error = action.payload.response;
      });
  },
});
export default userListSlice.reducer