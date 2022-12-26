import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterList: [],
  initialDrops: [
    {
      open: false,
      title: "userType",
      inputType: "RADIO",

      values: [
        { name: "بازایاب", checked: false, key: "type" },
        { name: "بازاریاب ارشد", checked: false, key: "type" },
      ],
    },
    {
      open: false,
      title: "organization",
      inputType: "CHECKBOX",

      values: [
        { name: "شعبه", checked: false, key: "organizations" },
        { name: "ستاد", checked: false, key: "organizations" },
        { name: "شرکت های فرعی", checked: false, key: "organizations" },
        { name: "نمایندگان", checked: false, key: "organizations" },
        { name: "سایر", checked: false, key: "organizations" },
      ],
    },
  ],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    dropDownAction(state, action) {
      state.initialDrops = state.initialDrops.map((item) => {
        console.log(item.title, "sdsad");
        if (item.title === action.payload.title) {
          return { ...item, open: !action.payload.open };
        } else {
          return item;
        }
      });
    },
    CheckBoxAction(state, action) {

      state.initialDrops.map((item) => {
        return item.values.map((e) => {
          if (e.checked === action.payload.checked) {
            return { ...e, checked: !action.payload.checked };
          } else {
            return e;
          }
        });
      });
    },
  },
});

export const { dropDownAction, CheckBoxAction } = filterSlice.actions;
export default filterSlice.reducer;
