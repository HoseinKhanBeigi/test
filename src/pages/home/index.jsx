import * as React from "react";
import { Link } from "react-router-dom";
import { Line } from "../../components/charts";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import { Card, CardHeader, Divider } from "@mui/material";
import {
  CardNote,
  CountClients,
  MeetingCard,
} from "../../components/cardDashboard";

import {
  Curve,
  Clients,
  Flash,
  Frame1325,
  RectTangle1,
  RectTangle2,
} from "../../components/icons";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { HeaderPage } from "../../components/headerPage";

import { dashboardApp } from "../../actions/profile";
import "./index.css";
import { DatePicker } from "../../components/datepicker";
import { AreaChart } from "../../components/areaChart";
import { StackBar } from "../../components/stackBar";
import moment from "moment";
import dayjs from "dayjs";
import { useDispatchAction } from "../../hooks/useDispatchAction";
// import Card from "../../theme/overrides/Card";

export const Home = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   dispatch(dashboardApp({}));
  // }, []);

  const {
    statusDashboard,
    entitiesDashboard,
    areaChartCategories,
    areaChartValues,
    error,
  } = useSelector((state) => state.dashboardAppSlice);

  const categories = ["حقوقی", "حقیقی"];
  const series = [
    {
      name: " شما",
      data: [20, 12],
    },
    {
      name: "RM سطح",
      data: [110, 120],
    },
    {
      name: "کل",
      data: [600000, 24000],
    },
  ];

  return (
    <>
      <HeaderPage title={t("workOfTable")} page="dashboard" />

      <Grid
        container
        justifyContent="center"
        dir="rtl"
        columns={{ xs: 4, md: 12 }}
        columnSpacing={{ xs: 2, sm: 2, md: 3 }}
        rowSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item md={8} lg={8} sm={6} xs={12}>
          <AreaChart
            title="میزان تغییرات دسته مشتریان"
            status={statusDashboard === "succeeded"}
            areaChartCategories={areaChartCategories}
            chartData={[
              {
                name: "تغییرات",
                type: "area",
                fill: "gradient",
                data: areaChartValues,
              },
            ]}
          />

          <Grid container mb={2} mt={2}>
            <Grid item md={3} lg={3} sm={3} xs={12}>
              <CountClients count={8} percent={3} />
            </Grid>
            <Grid item md={9} lg={9} sm={9} xs={12}>
              asdasd
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={7} lg={7} sm={6} xs={12}>
              <StackBar categories={categories} series={series} />
            </Grid>
            <Grid item md={5} lg={5} sm={6} xs={12}>
              <CardNote />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4} lg={4} sm={6} xs={12} order={{ xs: 1, sm: 1, md: 1 }}>
          <Card sx={{ padding: "20px", height: "100%" }}>
            <DatePicker />
            <Divider />
            <MeetingCard />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};