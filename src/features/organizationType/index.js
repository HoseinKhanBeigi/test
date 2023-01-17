// userSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { userOrganization } from '../../actions/users'


const initialState = {
  entities: [],
  status: "idle",
  loading:false,
  error: null,
};

export const userOrganizationType = createSlice({
  name: "userOrganizationType",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(userOrganization.pending, (state, action) => {
        state.status = "pending";
        state.loading = true;
        state.entities = [];
      })
      .addCase(userOrganization.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload;
        state.loading = false;
      })
      .addCase(userOrganization.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
        state.loading = false;
      });
  },
}).reducer