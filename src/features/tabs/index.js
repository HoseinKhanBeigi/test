import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterTabs: [
    { checked: false, name: "all", background: "#E5FFF6", color: "#017874" },
    {
      checked: false,
      name: "RM1",
      background: "#E5FFF6",
      color: "#017874",
    },
    {
      checked: false,
      name: "RM2",
      background: "#E5FFF6",
      color: "#017874",
    },
    {
      checked: false,
      name: "RM3",
      background: "#E5FFF6",
      color: "#017874",
    },
    {
      checked: false,
      name: "RM4",
      background: "#E5FFF6",
      color: "#017874",
    },
    {
      checked: false,
      name: "RM5",
      background: "#E5FFF6",
      color: "#017874",
    },
    {
      checked: false,
      name: "RM6",
      background: "#E5FFF6",
      color: "#017874",
    },
    {
      checked: false,
      name: "RM7",
      background: "#E5FFF6",
      color: "#017874",
    },
  ],
  ButtonTabs: [
    {
      checked: false,
      name: "accessiblities",
      background: "#E5FFF6",
      color: "#017874",
    },
    {
      checked: false,
      name: "branches",
      background: "#E5FFF6",
      color: "#017874",
    },
    // {
    //   checked: false,
    //   name: "sms",
    //   background: "#E5FFF6",
    //   color: "#017874",
    // },
    {
      checked: false,
      name: "userManager",
      background: "#E5FFF6",
      color: "#017874",
    },
    {
      checked: false,
      name: "instructure",
      background: "#E5FFF6",
      color: "#017874",
    },
  ],

  filterRMTabs: [],
};

const tabSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterActionTab(state, action) {
      state.filterRMTabs = state.filterRMTabs.map((item, idx) => {
        if (item.name === action.payload.name) {
          return { ...item, checked: true };
        } else {
          return { ...item, checked: false };
        }
      });
    },

    filterRm(state, action) {
  
      const arr = [];
      state.filterTabs.filter((item) => {
        if (item.name >= action.payload?.level) {
          if(action.payload.filterTab !== item.name){
            arr.push(item);
            state.filterRMTabs = arr;
          }
    
          // return arr;
        }
      });
    },

    actionTabAdmin(state, action) {
      state.ButtonTabs = state.ButtonTabs.map((item) => {
        if (item.name === action.payload.name) {
          return { ...item, checked: true };
        } else {
          return { ...item, checked: false };
        }
      });
    },
  },
});

export const { filterActionTab, filterRm ,actionTabAdmin} = tabSlice.actions;
export default tabSlice.reducer;
