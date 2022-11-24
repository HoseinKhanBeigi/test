import { instance } from "./http";
import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const createAsyncAction = (url, type) => {
  return createAsyncThunk(type, async (data, thunkAPI) => {
    const { page } = data;
    try {
      const response = await instance.get(url, {
        params: {
          page,
          client_id: process.env.REACT_APP_LIENT_ID,
        },
      });
      const data = JSON.parse(JSON.stringify(response?.data));
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  });
};