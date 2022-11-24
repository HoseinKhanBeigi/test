import { instance } from "../../services/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

 const createAsyncAction = (url, type) => {
  //url as a type for first parameter of createAsyncThunk
  return createAsyncThunk(type, async (data, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState();
      

      console.log(localStorage.getItem("userToken"));
      
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Credentials": true,
          "X-Requested-With": "XMLHttpRequest",
        },
      };
      const response = await instance.get(url, config);
      const data = JSON.parse(JSON.stringify(response?.data));
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  });
};


export const profile = createAsyncAction("", "profile");
