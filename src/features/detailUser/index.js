// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { userDetail } from "../../actions/users";

const initialState = {
  userDetails: [],
  statusDetail: "idle",
  errorDetial: null,
  organizationValue: "",
  basketClient:[],
  areaChartCategories: [],
  areaChartValues: [],
  donatChartValues:[],
  donatChartLabels:[],
  lineChartCategories: [],
  lineChartValues: [],
  cards:null

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
        state.cards = action?.payload.data?.cards
        const dateOfLineChart= action?.payload.data?.charts.client_rank
        const dateOfearaChart = action?.payload.data?.charts.client_segment_chart;
        const basket = action?.payload.data?.charts.client_type_chart;
        const quantity = action?.payload.data?.charts.client_segment_quantity_chart;


        const labels = [];
        const valuesOfQuantity = [];
        quantity.map((e)=>{
          labels.push(e.bi_point);
          valuesOfQuantity.push(e.total)
        });
        state.donatChartLabels = labels;
        state.donatChartValues = valuesOfQuantity;


        const categories = [];
        const values = [];
        for (const [key, value] of Object.entries(dateOfearaChart)) {
          categories.push(`${key.slice(5, 7)}`);
          values.push(value);
        }
        state.areaChartCategories = categories;
        state.areaChartValues = values;


        const categoriesLine = [];
        const valuesLine = [];
        for (const [key, value] of Object.entries(dateOfLineChart)) {
          categoriesLine.push(`${key.slice(5, 7)}`);
          valuesLine.push(value);
        }
        state.lineChartCategories = categoriesLine;
        state.lineChartValues = valuesLine;
        const series = [
          {
            name: " شما",
            data: [
              basket.haghighi_clients_count,
              basket.hoghoghi_clients_count,
            ],
          },
          {
            name: "RM سطح",
            data: [
              basket.rm_haghighi_clients_count,
              basket.rm_hoghoghi_clients_count,
            ],
          },
          {
            name: "کل",
            data: [
              basket.total_haghighi_clients_count,
              basket.total_hoghoghi_clients_count,
            ],
          },
        ];
        state.basketClient = series;
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
