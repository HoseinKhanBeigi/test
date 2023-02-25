import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Line } from "../../components/charts";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import { Card, CardHeader, Divider } from "@mui/material";
import { convertDigits } from "persian-helpers";

import {
  CardNote,
  CountClients,
  TargetCard,
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
import nodata from "./nodata.png";
import moment from "moment";
import dayjs from "dayjs";
import { useDispatchAction } from "../../hooks/useDispatchAction";
import { NoteForm } from "../../components/noteDialog";
// import Card from "../../theme/overrides/Card";

export const Home = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInsertMeeting = () => {
    if (entitiesDashboard?.data?.user.super_admin === 1) {
      navigate("/interactions/meetings/create");
    } else if (
      entitiesDashboard?.data?.user.permissions.some(
        (e) => e.name === "meeting_create"
      )
    ) {
      navigate("/interactions/meetings/create");
    }
  };

  const handleToNote = () => {
    if (entitiesDashboard?.data?.user.super_admin === 1) {
      navigate("/notes");
    } else if (
      entitiesDashboard?.data?.user.permissions.some((e) => e.name === "note")
    ) {
      navigate("/notes");
    }
  };

  const handleToIntraction = ()=>{
    navigate("/interactions");
  }

  const {
    statusDashboard,
    entitiesDashboard,
    areaChartCategories,
    areaChartValues,
    basketClient,
    error,
  } = useSelector((state) => state.dashboardAppSlice);

  const categories = ["حقیقی", "حقوقی"];

  const [open, setOpen] = React.useState(false);

  const openNoteForm = () => {
    setOpen(true);
  };

  return (
    <>
      <NoteForm open={open} setOpen={setOpen} title="یادداشت جدید" page="home"/>
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

          <Grid container mb={2} mt={2} columnSpacing={2}>
            <Grid item md={5} lg={5} sm={5} xs={12}>
              <CountClients
                count={convertDigits(
                  entitiesDashboard?.data?.client_count_chart?.clients_count
                )}
                percent={convertDigits(
                  entitiesDashboard?.data?.client_count_chart?.clients_percent
                )}
                status={statusDashboard === "succeeded"}
              />
            </Grid>
            <Grid item md={7} lg={7} sm={7} xs={12}>
              <TargetCard nodata={nodata} />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={7} lg={7} sm={6} xs={12}>
              <Card>
                <Typography sx={{ paddingLeft: "16px", paddingTop: "12px" }}>
                  {"سبد مشتریان"}
                </Typography>
                <StackBar
                  categories={categories}
                  series={basketClient}
                  status={statusDashboard === "succeeded"}
                />
              </Card>
            </Grid>
            <Grid item md={5} lg={5} sm={6} xs={12}>
              <CardNote
              handleToPage={handleToNote}
                notes={entitiesDashboard?.data?.notes}
                status={statusDashboard === "succeeded"}
                handleClick={openNoteForm}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4} lg={4} sm={6} xs={12} order={{ xs: 1, sm: 1, md: 1 }}>
          <Card sx={{ padding: "20px", height: "100%" }}>
            <DatePicker entitiesDashboard={entitiesDashboard} />
            <Divider />
            <MeetingCard
              handleClick={handleInsertMeeting}
              handleToPage={handleToIntraction}
              meetings={entitiesDashboard?.data?.meetings}
              status={statusDashboard === "succeeded"}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
