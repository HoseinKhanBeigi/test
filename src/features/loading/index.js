import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const loadingSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    handleLoading(state, action) {
      state.loading = action.payload.status;
    },
  },
});

export const { handleLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
