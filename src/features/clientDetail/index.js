// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { clientDetail } from "../../actions/clients";

const initialState = {
  clientDetails: [],
  statusDetail: "idle",
  errorDetial: null,
  //rank
  rankCategories: [],
  rankValuesFirstLine: [],
  rankValuesSecondLine: [],
  //service_rank
  rankServiceCategories: [],
  rankServiceValuesFirstLine: [],
  rankServiceValuesSecondLine: [],
  //assignment_rank
  rankAssingmentCategories: [],
  rankAssingmentValuesFirstLine: [],
  rankAssingmentValuesSecondLine: [],
  //equipments_rank
  rankEquipmentsFirstLine: [],
  rankEquipmentsValuesSecondLine: [],
  rankEquipmentsCategories: [],
  //total_rank
  rankTotalCategories:[],
  rankTotalFirstLine:[],
  rankTotalValuesSecondLine:[]
};

const getKeyValue = (datas) => {
  const categories = [];
  const values = [];
  for (const [key, value] of Object.entries(datas)) {
    categories.push(`${key.slice(5, 7)}`);
    values.push(value);
  }
  return {
    categories,
    values,
  };
};

const getLinesValue = (datas1, datas2) => {
  const firstLine = getKeyValue(datas1);
  const secondLine = getKeyValue(datas2);
  return {
    firstLine,
    secondLine,
  };
};

export const clientDetailShow = createSlice({
  name: "clientDetial",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(clientDetail.pending, (state, action) => {
        state.statusDetail = "pending";
        state.clientDetails = [];
      })
      .addCase(clientDetail.fulfilled, (state, action) => {
        state.statusDetail = "succeeded";
        state.clientDetails = action.payload;
        // rank
        const dateOfearaChart = action?.payload.data?.charts.rank;

        const linesRank = getLinesValue(
          dateOfearaChart.client_ranks,
          dateOfearaChart.same_rm_client_ranks_average
        );

        state.rankValuesFirstLine = linesRank.firstLine.values;
        state.rankValuesSecondLine = linesRank.secondLine.values;
        state.rankCategories = linesRank.firstLine.categories;

        // services_rank
        const dateOfearaChartServieRank =
          action?.payload.data?.charts.services_rank;

        const linesRank2 = getLinesValue(
          dateOfearaChartServieRank.client,
          dateOfearaChartServieRank.same_rm_average
        );

        state.rankServiceValuesFirstLine = linesRank2.firstLine.values;
        state.rankServiceValuesSecondLine = linesRank2.secondLine.values;
        state.rankServiceCategories = linesRank2.firstLine.categories;

        //assignment_Rank
        const dateOfearaChartAssignMent =
          action?.payload.data?.charts.services_rank;

        const linesRank3 = getLinesValue(
          dateOfearaChartAssignMent.client,
          dateOfearaChartAssignMent.same_rm_average
        );

        state.rankAssingmentValuesFirstLine = linesRank3.firstLine.values;
        state.rankAssingmentValuesSecondLine = linesRank3.secondLine.values;
        state.rankAssingmentCategories = linesRank3.firstLine.categories;

        //equipments_rank
        const dateOfearaChartEquipments_rank =
          action?.payload.data?.charts.equipments_rank;

        const linesRank4 = getLinesValue(
          dateOfearaChartEquipments_rank.client,
          dateOfearaChartEquipments_rank.same_rm_average
        );

        state.rankEquipmentsFirstLine = linesRank4.firstLine.values;
        state.rankEquipmentsValuesSecondLine = linesRank4.secondLine.values;
        state.rankEquipmentsCategories = linesRank4.firstLine.categories;

        //total_rank
        const dateOfearaChartTotal_rank =
          action?.payload.data?.charts.total_rank;

        const linesRank5 = getLinesValue(
          dateOfearaChartTotal_rank.client,
          dateOfearaChartTotal_rank.same_rm_average
        );

        state.rankTotalFirstLine = linesRank5.firstLine.values;
        state.rankTotalValuesSecondLine = linesRank5.secondLine.values;
        state.rankTotalCategories = linesRank5.firstLine.categories;
      })
      .addCase(clientDetail.rejected, (state, action) => {
        state.statusDetail = "failed";
        state.errorClient = action;
      });
  },
}).reducer;
