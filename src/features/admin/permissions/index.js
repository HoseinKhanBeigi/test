// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { PermissinsAction } from "../../../actions/admin";

const initialState = {
  entities: [],
  permissins: [
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
  permissionsList: [],
  status: "idle",
  error: null,
};

const permissionsSlice = createSlice({
  name: "permissionsList",
  initialState,
  reducers: {
    getStatusOfPermissions() {
        
    },
  },
  extraReducers(builder) {
    builder
      .addCase(PermissinsAction.pending, (state, action) => {
        state.status = "pending";
        state.entities = [];
      })
      .addCase(PermissinsAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload;
        state.permissionsList = [...action.payload.data.permissions].map(
          (e) => {
            return {
              status: false,
              ...e,
            };
          }
        );
      })
      .addCase(PermissinsAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
});
export const {} = permissionsSlice.actions;
export default permissionsSlice.reducer;
