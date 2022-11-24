// userActions.js
import {instance} from "../../services/http";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const userLogin = createAsyncThunk(
    'user/login',
    async ({ username, password }, { rejectWithValue }) => {
      try {
        // configure header's Content-Type as JSON
        const config = {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Credentials": true,
            "X-Requested-With": "XMLHttpRequest",
          },
        }
        const { data } = await instance.post(
          '/login',
          { username, password },
          config
        )
        console.log(data);
        // store user's token in local storage
        localStorage.setItem('userToken', data.data.access_token)
        return data
      } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  );


