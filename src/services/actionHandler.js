import instance from "./http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createAsyncAction = (url, type, method) => {
  return createAsyncThunk(type, async ({ ...values }, thunkAPI) => {
    let fd = new FormData();
    console.log(values);
    try {
      let response;
      const config = {
        headers: {
          "Content-Type": values.file || values?.res?.attach || values?.attach
            ? "multipart/form-data"
            : "application/json",
          "Access-Control-Allow-Credentials": true,
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        params: {
          // limit: 10,
          ...values.params,
        },
      };

      if (method === "post") {
        delete config.params;
        response = await instance[method](url, { ...values }, config);
      } else if (method === "delete") {
        delete config.params;
        const ids = values.id;
        const urlvalue = `${url}/${ids}`;

        response = await instance[method](urlvalue, config);
      } else if (method === "update" || method === "patch") {
        delete config.params;
        const ids = values.id;
        const urlvalue = `${url}/${ids}`;

        response = await instance[method](urlvalue, { ...values.res }, config);
      } else {
        if (values?.id) {
          const ids = values.id;
          const urlvalue = `${url}/${ids}`;
          response = await instance[method](urlvalue, config);
        } else {
          response = await instance[method](url, config);
        }
      }
      const data = JSON.parse(JSON.stringify(response?.data));
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  });
};
