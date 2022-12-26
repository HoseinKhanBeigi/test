// userSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { clientOrganization } from '../../actions/clients'


const initialState = {
  entities: [],
  status: "idle",
  error: null,
};

export const clientOrganizationType = createSlice({
  name: 'clientOrganization',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(clientOrganization.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(clientOrganization.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload
      })
      .addCase(clientOrganization.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
}).reducer