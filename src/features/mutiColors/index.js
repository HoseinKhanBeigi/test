import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  colors: [
    { name: "green", status: true, background: "#017874" },
    { name: "Purple", status: false, background: "#431E75" },
    { name: "PurpleSlow", status: false, background: "#A5448E" },
    { name: "orange", status: false, background: "#FF7A00" },
  ],
};

const MutiColors = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeColor(state, action) {
      state.colors = state.colors.map((item) => {
        if (item.name === action.payload.name) {
          return { ...item, status: true };
        } else {
          return { ...item, status: false };
        }
      });
    },
  },
});

export const { changeColor } = MutiColors.actions;
export default MutiColors.reducer;
