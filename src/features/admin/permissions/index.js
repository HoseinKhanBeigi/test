// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { PermissinsAction } from "../../../actions/admin";

const initialState = {
  entities: [],
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
  permissionsList: [],
  roles: [],
  RM1: [],
  RM2: [],
  RM3: [],
  RM4: [],
  RM5: [],
  RM6: [],
  RM7: [],
  status: "idle",
  error: null,
};

const permissionsSlice = createSlice({
  name: "permissionsList",
  initialState,
  reducers: {
    getStatusOfPermissions(state, action) {
      state.permissions = state.permissions.map((item) => {
        if (item.id === action.payload.roles.id) {
          return {
            ...item,
            roles: action.payload.roles.roles.map((e, i) => {
              if (action.payload.value.key === e.key) {
                if (e.key === action.payload.value.key) {
                  const exist = state[action.payload.value.key].find((k) => k === item.id);
                  if (exist) {
                    state[action.payload.value.key] = state[action.payload.value.key].filter((k) => k !== exist);
                  } else {
                    state[action.payload.value.key].push(item.id);
                  }
                }

                return {
                  ...e,
                  status: !e.status,
                };
              } else {
                return e;
              }
            }),
          };
        } else {
          return item;
        }
      });
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

        state.permissions = state.permissions.map((item) => {
          return {
            ...item,
            roles: Object.entries(action.payload.data.roles).map(
              ([key, value]) => {
                if (value.includes(item.id)) {
                  switch (key) {
                    case "RM1":
                      state.RM1 = value;
                      break;
                    case "RM2":
                      state.RM2 = value;
                      break;
                    case "RM3":
                      state.RM3 = value;
                      break;
                    case "RM4":
                      state.RM4 = value;
                      break;
                    case "RM5":
                      state.RM5 = value;
                      break;
                    case "RM6":
                      state.RM6 = value;
                      break;
                    case "RM7":
                      state.RM7 = value;
                      break;
                  }
                  return { key, status: true };
                } else {
                  return { key, status: false };
                }
              }
            ),
          };
        });
      })
      .addCase(PermissinsAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
});
export const { getStatusOfPermissions } = permissionsSlice.actions;
export default permissionsSlice.reducer;
