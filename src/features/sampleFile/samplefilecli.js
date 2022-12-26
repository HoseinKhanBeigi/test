// userSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { clientSampleFile } from '../../actions/clients'


const initialState = {
  entities: [],
  status: "idle",
  error: null,
};

export const sampleFilecli = createSlice({
  name: 'clientsampleFile',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(clientSampleFile.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(clientSampleFile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload
      })
      .addCase(clientSampleFile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
}).reducer;