// userSlice.js
import { createSlice,createAction } from '@reduxjs/toolkit'
import { userCreate } from '../../actions/users';
import {clearError} from "../../actions/actions"

const initialState = {
  entitiesCreateUser: [],
  statusCreateUsre: "idle",
  errorCreateUsre: null,
  errorServer:[]
};




const userCreatetest = createSlice({
  name: 'userCreate',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(clearError, (state, action) => {
      state.errorServer = [];
      state.errorCreateUsre = null
    })
    builder
      .addCase(userCreate.pending, (state, action) => {
        state.statusCreateUsre = "pending";
        state.entitiesCreateUser = [];
      })
      .addCase(userCreate.fulfilled, (state, action) => {
        state.statusCreateUsre = "succeeded";
        state.entitiesCreateUser = action.payload
      })
      .addCase(userCreate.rejected, (state, action) => {
        state.statusCreateUsre = "failed";
        state.errorServer = [];
        if (action.payload?.response?.status === 500) {
          state.statusCreateUsre = "idle";
          state.errorCreateUsre = ["Internal Server Error"];
        }
        if (
          action.payload?.response?.status === null ||
          action.payload?.response?.status === undefined
        ) {
          state.errorCreateUsre = null;
        } else {
          for (let [key, value] of Object.entries(
            action.payload?.response?.data?.errors
          )) {
            value.map((e) => {
              state.errorServer.push(e);
            });
          }
          state.errorCreateUsre = state.errorServer;
        }
      });
  },
});
export default userCreatetest.reducer