import * as React from "react";
import { Grid } from "@mui/material";
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import Button from "@mui/material/Button";
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
  DownloadIconInstruc
} from "../../components/icons";
import { useTranslation } from "react-i18next";
import doc from "./doc.png";

export const Instructions = () => {
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
          <Typography className="title">{t("instructions")}</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
     {[1,2,3,4,5,6,8,8,8,8,8,8,8,8,8,8,88,8,8,8,4].map((_,i)=>{
        return(
            <Grid item key={i}>
            <Card sx={{ padding: "12px", width: "176px", height: "224px" }}>
            <Grid container mb={2}>
              <img src={doc} />
            </Grid>
  
            <Grid container mb={2} justifyContent="space-between" dir="rtl">
              <Typography>1401/1/1234</Typography>
              <Typography
                sx={{
                  background: "#C0DDC0",
                  padding: "2px",
                  borderRadius: "12px",
                }}
              >
                cl
              </Typography>
            </Grid>
            <Grid container justifyContent={"center"} textAlign="center">
              <Typography fontSize={"15px"}>
                {"شرایط جدید اهدای تسهیلات"}
              </Typography>
            </Grid>
            <Grid container justifyContent={"center"} textAlign="center">
              <Button fullWidth sx={{ background: "#5041BC", color: "white" }}>
                <Typography fontSize={"12px"} sx={{paddingRight:"2px"}}>{t("download")}</Typography>
                <DownloadIconInstruc/>
              </Button>
            </Grid>
          </Card>
          </Grid>
        )
     })}
      </Grid>
    </>
  );
};
