import * as React from "react";
import { Grid } from "@mui/material";
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import { AppDashboard } from "../../components/dashboard";
import TextField from "@mui/material/TextField";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  UserIcon,
  Polygon1,
  Polygon2,
  Polygon3,
  PopupCity,
  IconReportPhone,
  
} from "../../components/icons";
import { useTranslation } from "react-i18next";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import Modal from "@mui/material/Modal";
import maghadas from "./moghadas.png";
import picStr from "./picStr.png";

// import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from "@mui/material/InputAdornment";
import IranMap from "../../components/iranMap";
import IranMap2 from "../../components/iranMap2";

import chart1 from "./chart1.png"
import chart2 from "./chart2.png"


import customer from "./customer.png"
import users from "./users.png"
import history from "./history.png"
import meetting from "./meetting.png"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  height: "100%",

  boxShadow: 24,
  p: 4,
};

export const ReportDetail = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClickModal = () => {};
  const { t, i18n } = useTranslation();
  return (
    <>
      <Grid
        container
        flexDirection={"column"}
        justifyContent="end"
        alignItems={"end"}
      >
        <Grid item mb={8}>
          <Typography className="title">{t("report")}</Typography>
        </Grid>
      </Grid>
      <Grid container dir="rtl" spacing={2}>
        <Grid item xl={6} >
          <Grid container spacing={2} mb={2}>
            <Grid item xl={6}>
              <Card sx={{padding:"24px"}}>
                <Grid container spacing={2}>
                  <Grid item xl={2}>
                    <IconReportPhone />
                  </Grid>
                  <Grid item xl={10}>
                    <Typography>تعداد تماس های تلفنی ثبت شده</Typography>2
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xl={6}>
              <Card sx={{padding:"24px"}}>
                <Grid container>
                  <Grid item xl={2}>
                    <IconReportPhone />
                  </Grid>
                  <Grid item xl={10}>
                    <Typography>{"میزان زمان صرف شده در سامانه"}</Typography>2
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xl={6}>
              <Card sx={{padding:"24px"}}>
                <Grid container>
                  <Grid item xl={2}>
                    <IconReportPhone />
                  </Grid>
                  <Grid item xl={10}>
                    <Typography>{"تعداد جلسات برگزار شده ثبت شده"}</Typography>2
                  </Grid>
                </Grid>
              </Card>
            </Grid>{" "}
            <Grid item xl={6}>
              <Card sx={{padding:"24px"}}>
                <Grid container>
                  <Grid item xl={2}>
                    <IconReportPhone />
                  </Grid>
                  <Grid item xl={10}>
                    <Typography>{"مدت زمان جلسه"}</Typography>2
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={6}>
          <Grid container spacing={2}>
            <Grid item xl={6}>
              <Card sx={{padding:"24px"}}>
                <Grid container>
                  <Grid item xl={2}>
                    <IconReportPhone />
                  </Grid>
                  <Grid item xl={10}>
                    <Typography  mb={2}>{"فراوانی طبقه مشتریان اختصاص داده شده"}</Typography>
                    <img src={chart1}/>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xl={6}>
              <Card sx={{padding:"24px"}}>
                <Grid container>
                  <Grid item xl={2}>
                    <IconReportPhone />
                  </Grid>
                  <Grid item xl={10}>
                    <Typography mb={2}>{"تغییر وضعیت مشتریان در بازه زمانی"}</Typography>
                    <img src={chart2}/>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xl={9}>
                <Card sx={{padding:"24px"}}>
                    <Grid container justifyContent={"space-evenly"}>
                        <img src={customer}/>
                        <img src={users}/>
                        <img src={history}/>
                        <img src={meetting}/>
                    </Grid>
                </Card>
            </Grid>
            <Grid item xl={3}>
            <Card sx={{padding:"24px"}}>
                <Grid container>
                  <Grid item xl={2}>
                    <IconReportPhone />
                  </Grid>
                  <Grid item xl={10}>
                    <Typography  mb={2}>{"فراوانی طبقه مشتریان اختصاص داده شده"}</Typography>
                    <img src={chart1}/>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
        </Grid>
      </Grid>
    </>
  );
};
