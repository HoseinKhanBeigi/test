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
import { CardNote, MeetingCard } from "../../components/cardDashboard";

import {
  Curve,
  Clients,
  Flash,
  Frame1325,
  Frame1326,
  RectTangle1,
  RectTangle2,
  UserIconTitle,
  PlusIcon,
  OptionIcone,
  RemoveCalender,
  Yazed,
} from "../../components/icons";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { HeaderPage } from "../../components/headerPage";

import { dashboardApp } from "../../actions/profile";
import "./index.css";
import { boxSizing } from "@mui/system";
import { DatePicker } from "../../components/datepicker";
import { AppDashboard } from "../../components/dashboard";
// import Card from "../../theme/overrides/Card";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  // marginLeft:theme.spacing(8),
  // marginRight:theme.spacing(8)
}));

const IconPaper = styled("div")(({ theme }) => ({
  backgroundColor: "#017874",
  width: "40px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "7px",
  marginBottom: "16px",
}));

export const Home = () => {
  const switch1 = React.useRef("");

  const handleChange = (e) => {
    const spanClients = document.querySelector(".spanClients");
    const spanClients2 = document.querySelector(".spanClients2");
    if (e.currentTarget.checked) {
      spanClients.classList.remove("white-text");
      spanClients2.classList.add("white-text");
    } else if (e.currentTarget.checked === false) {
      spanClients.classList.add("white-text");
      spanClients2.classList.remove("white-text");
    }
  };

  React.useEffect(() => {
    const spanClients = document.querySelector(".spanClients");
    const spanClients2 = document.querySelector(".spanClients2");
    if (switch1.current.checked) {
      spanClients.classList.remove("white-text");
      spanClients2.classList.add("white-text");
    } else if (switch1.current.checked === false) {
      spanClients.classList.add("white-text");
      spanClients2.classList.remove("white-text");
    }
  }, []);

  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   dispatch(dashboardApp());
  // }, []);

  return (
    <>
      <HeaderPage title={t("workOfTable")} page="dashboard" />
      <Box>
        <Grid container spacing={2} justifyContent="center" dir="rtl">
          <Grid item xs={12} xl={8}>
            <AppDashboard
              title="میزان تغییرات رتبه مشتری"
              // subheader="(+43%) than last year"
              chartLabels={[
                "01/01/2003",
                "02/01/2003",
                "03/01/2003",
                "04/01/2003",
              ]}
              chartData={[
                {
                  name: "هدف",
                  type: "area",
                  fill: "gradient",
                  data: [44, 55, 41, 67],
                },
                {
                  name: "انجام شده",
                  type: "line",
                  fill: "solid",
                  data: [30, 25, 36, 30],
                },
              ]}
            />

            <Grid container spacing={1} mt={0}>
              <Grid item xs={12} xl={4}>
                <Card sx={{ padding: "12px" }}>
                  <Grid container justifyContent="center" alignContent="center">
                    <Grid container item xs={6} justifyContent="center">
                      <Curve />
                    </Grid>
                    <Grid
                      container
                      item
                      xs={6}
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="column"
                    >
                      <IconPaper>
                        <Clients stroke={"#ffffff"} />
                      </IconPaper>
                      <Typography mb={1} fontSize=".6em">
                        مشتریان
                      </Typography>
                      <Typography mb={1} fontSize=".6em">
                        ۱۵۶ نفر
                      </Typography>
                      <Grid
                        item
                        container
                        gap={1}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Typography fontSize=".6em" color={"#017874"}>
                          70%
                        </Typography>
                        <Flash />
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12} xl={8}>
                <Card sx={{ padding: "12px" }}>
                  <Grid
                    container
                    justifyContent={"space-between"}
                    alignItems="center"
                  >
                    <Grid item xs={6}>
                      <Typography fontSize={"1rem"}>
                        فاصله شما نست به هدف
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={6}
                      flexDirection="row"
                      justifyContent={"start"}
                      mt={1}
                    >
                      <Grid
                        item
                        container
                        xs={6}
                        justifyContent={"start"}
                        alignItems="center"
                      >
                        <Typography fontSize={".8rem"}>رتبه شما</Typography>
                        <Frame1325 />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        container
                        justifyContent={"starts"}
                        alignItems="center"
                      >
                        <Typography fontSize={"0.8rem"}>رتبه شما</Typography>
                        <Frame1325 />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    justifyContent="end"
                    sx={{
                      position: "relative",
                    }}
                  >
                    <Grid item sx={{ position: "absolute" }}>
                      <RectTangle2 />
                    </Grid>
                    <Grid item>
                      <RectTangle1 />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
            <Grid container mt={0}>
              <Grid item xs={12} xl={6}>
                <CardNote />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} xl={4}>
            <Card sx={{ padding: "20px" }}>
              <DatePicker />
              <Divider />

              <MeetingCard />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
