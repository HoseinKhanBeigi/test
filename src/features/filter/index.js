import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterList: [],
  initialDropsUser: [
    {
      open: false,
      title: "userType",
      inputType: "RADIO",

      values: [
        { title: "مدیر ارتباط", checked: false, key: "userType" },
        { title: "مدیر ارتباط ارشد", checked: false, key: "userType" },
      ],
    },
    {
      open: false,
      title: "organization",
      inputType: "CHECKBOX",

      values: [
        { title: "شعبه", checked: false, key: "organization" },
        { title: "ستاد", checked: false, key: "organization" },
        { title: "شرکت های فرعی", checked: false, key: "organization" },
        { title: "نمایندگان", checked: false, key: "organization" },
        { title: "سایر", checked: false, key: "organization" },
      ],
    },
  ],

  initialDropsClient: [
    {
      open: false,
      title: "clientType",
      inputType: "RADIO",
      values: [
        { title: "حقيقي", checked: false, key: "clientType" },
        { title: "حقوقي", checked: false, key: "clientType" },
      ],
    },

    {
      open: false,
      title: "gender",
      inputType: "RADIO",

      values: [
        { title: "مرد", checked: false, key: "gender" },
        { title: "زن", checked: false, key: "gender" },
      ],
    },
    {
      open: false,
      title: "bi_point",
      inputType: "CHECKBOX",

      values: [
        { title: "A*", checked: false, key: "bi_point" },
        { title: "A+", checked: false, key: "bi_point" },
        { title: "A", checked: false, key: "bi_point" },
        { title: "B+", checked: false, key: "bi_point" },
        { title: "B", checked: false, key: "bi_point" },
        { title: "C", checked: false, key: "bi_point" },
        { title: "D", checked: false, key: "bi_point" },
        { title: "E", checked: false, key: "bi_point" },
      ],
    },
  ],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    dropDownAction(state, action) {
      state[action.payload.name] = state[action.payload.name].map((item) => {
        if (item.title === action.payload.title) {
          return { ...item, open: !item.open };
        } else {
          return item;
        }
      });
    },
    filterAction(state, action) {
      const idx = state[action.payload.name].findIndex(
        (f) => f.title === action.payload.item.key
      );

      state[action.payload.name][idx].values = state[action.payload.name][
        idx
      ].values.map((item, index) => {
        if (item.title === action.payload.title) {
          const exist = state.filterList.find((e) => e.title === item.title);
          if (exist) {
            state.filterList = state.filterList.filter(
              (e) => e.title !== exist.title
            );
          } else {
            state.filterList.push({
              ...item,
              checked: !item.checked,
            });
          }
          return { ...item, checked: !item.checked };
        } else if (action.payload.type === "CHECKBOX") {
          return item;
        } else {
          state.filterList = state.filterList.filter(
            (e) => e.title !== item.title
          );
          return { ...item, checked: false };
        }
      });
    },
    removeFilterUser(state) {
      state.filterList = [];
      state.initialDropsUser = state.initialDropsUser.map((e) => {
        return { ...e, open: false };
      });
      state.initialDropsUser.map((e, i) => {
        e.values = e.values.map((item) => {
          return { ...item, checked: false };
        });
      });
    },
    removeFilterClient(state) {
      state.filterList = [];
      state.initialDropsClient = state.initialDropsClient.map((e) => {
        return { ...e, open: false };
      });

      state.initialDropsClient.map((e, i) => {
        e.values = e.values.map((item) => {
          return { ...item, checked: false };
        });
      });
    },
  },
});

export const { dropDownAction, filterAction, removeFilterUser,removeFilterClient } =
  filterSlice.actions;
export default filterSlice.reducer;
