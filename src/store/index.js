// app/store.js
import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user';
import userListSlice from '../features/users';
import profileSlice from "../features/profile";

const store = configureStore({
  reducer: {
    user: userReducer,
    userList:userListSlice,
    profile:profileSlice
  }
})
export default store