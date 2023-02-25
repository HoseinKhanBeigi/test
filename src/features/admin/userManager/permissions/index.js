// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { permissionsUser } from "../../../../actions/admin";

const initialState = {
  entities: [],
  status: "idle",
  error: null,
  permissionList: [],
  permissions: [
    { id: 1, name: "sms", label: "پیامک", status: false },
    { id: 2, name: "user_show", label: "لیست مدیران ارتباط" },
    { id: 3, name: "user_create", label: "درج مدیر ارتباط", status: false },
    {
      id: 4,
      name: "user_group_create",
      label: "درج گروهی مدیر ارتباط",
      status: false,
    },
    {
      id: 5,
      name: "client_assign",
      label: "اختصاص مشتری به مدیر ارتباط",
      status: false,
    },
    { id: 6, name: "interaction", label: "تعاملات", status: false },
    { id: 7, name: "instruction", label: "دستورالعمل ها", status: false },
    { id: 8, name: "note", label: "یادداشت ها", status: false },
    { id: 9, name: "client_show", label: "لیست مشتری ها", status: false },
    { id: 10, name: "client_create", label: "درج مشتری", status: false },
    {
      id: 11,
      name: "client_group_create",
      label: "درج گروهی مشتری",
      status: false,
    },
    { id: 12, name: "meeting_show", label: "لیست جلسه ها", status: false },
    { id: 13, name: "meeting_create", label: "درج جلسه", status: false },
    { id: 14, name: "call_show", label: "لیست تماس ها", status: false },
    { id: 15, name: "call_create", label: "درج تماس", status: false },
    { id: 16, name: "report", label: "گزارشات", status: false },
    {
      id: 17,
      name: "others_client_show",
      label: "لیست مشتری های سایر مدیران ارتباط",
    },
  ],
};

const permissionUserSlice = createSlice({
  name: "permissionList",
  initialState,
  reducers: {
    changePermissionStatus(state, action) {
      state.permissions = state.permissions.map((item) => {
        if (item.id === action.payload.id) {
          const exist = state.permissionList.find((e) => e.id === item.id);
          if (exist) {
            state.permissionList = state.permissionList.filter(
              (e) => e.id !== exist.id
            );
          } else {
            state.permissionList.push({
              ...item,
              status: !item.status,
            });
          }
          return { ...item, status: !item.status };
        } else {
          return item;
        }
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(permissionsUser.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(permissionsUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload;
        state.permissionList = action?.payload?.data?.permissions.map((e)=>{
          return{
            ...e,
            status:true
          }
        });
        state.permissions = state.permissions.map((e) => {
          return {
            ...e,
            status: action?.payload?.data?.permissions.some(
              (k) => k.id === e.id
            ),
          };
        });
      })
      
      .addCase(permissionsUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
});

export const { changePermissionStatus } = permissionUserSlice.actions;
export default permissionUserSlice.reducer;
