// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { userDetail } from "../../actions/users";

const initialState = {
  userDetails: [],
  statusDetail: "idle",
  errorDetial: null,
  organizationValue: "",
};

const userDetailShow = createSlice({
  name: "userDetail",
  initialState,
  reducers: {
    subOrganization(state, action) {},
  },
  extraReducers(builder) {
    builder
      .addCase(userDetail.pending, (state, action) => {
        state.statusDetail = "pending";
        state.userDetails = [];
      })
      .addCase(userDetail.fulfilled, (state, action) => {
        state.statusDetail = "succeeded";
        state.userDetails = action.payload;
        switch (action.payload.data?.user?.organization) {
          case "شعبه":
            state.organizationValue = action.payload.data?.user?.branch_id;
            break;
          case "سایر":
            state.organizationValue = action.payload.data?.user?.branch_id;
            break;
          case "شرکت های فرعی":
            state.organizationValue = action.payload.data?.user?.company_id;
            break;
          case "نمایندگان":
            state.organizationValue = action.payload.data?.user?.agency_id;
            break;
          case "ستاد":
            state.organizationValue =
              action.payload?.data?.user?.head_quarter_department_id;
            break;
          default:
            state.organizationValue = action.payload.data?.user?.branch_id;
        }
      })
      .addCase(userDetail.rejected, (state, action) => {
        state.statusDetail = "failed";
        state.errorClient = action;
      });
  },
});

export const { subOrganization } = userDetailShow.actions;
export default userDetailShow.reducer;
