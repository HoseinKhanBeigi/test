// userSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { userOrganization } from '../../actions/users'


const initialState = {
  entities: [],
  status: "idle",
  error: null,
};

export const userOrganizationType = createSlice({
  name: "userOrganization",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(userOrganization.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(userOrganization.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload
      })
      .addCase(userOrganization.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
}).reducer