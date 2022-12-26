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
  Yazed
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

export const Reports = () => {
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
        <Grid item xs={12} md={6} lg={6}>
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={t("manger")}
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Grid container alignItems={"center"} mt={4}>
            <img src={maghadas} />
            <Typography padding={2}>{"مرتضی مقدسیان"}</Typography>
          </Grid>
          <Card
                    
                    sx={{ border: "1px solid silver", marginBottom: "6px" }}
                  >
                    <Grid
                      container
                      justifyContent={"space-between"}
                      alignItems="center"
                    >
                      <Grid item xl={6}>
                        <Grid
                          item
                          container
                          flexDirection={"column"}
                          padding={2}
                        >
                          <Grid
                            container
                            sx={{ justifyContent: "space-between" }}
                            mb={2}
                          >
                            <Typography>شعبه ناهید</Typography>
                            <Typography>ممتاز</Typography>
                          </Grid>
                          <Grid
                            container
                            sx={{ justifyContent: "space-between" }}
                            mb={2}
                          >
                            <Typography>آدرس: </Typography>
                            <Typography>ناهید غربی پلاک 38 </Typography>
                          </Grid>
                          <Grid
                            container
                            sx={{ justifyContent: "space-between" }}
                            mb={2}
                          >
                            <Typography>تلفن:</Typography>
                            <Typography>02188001200</Typography>
                          </Grid>
                          <Grid
                            container
                            sx={{ justifyContent: "space-between" }}
                          >
                            <Typography
                              sx={{
                                background: "#F7C3E0",
                                borderRadius: "8px",
                                padding: "4px",
                              }}
                            >
                              ریالی
                            </Typography>
                            <Typography
                              sx={{
                                background: "#C0DDC0",
                                borderRadius: "8px",
                                padding: "4px",
                              }}
                            >
                              ارزی
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xl={6}>
                        <img src={picStr} />
                      </Grid>
                    </Grid>
                  </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <div>
            <Yazed />
          </div>
        </Grid>
      </Grid>
    </>
  );
};
