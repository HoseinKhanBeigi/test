import * as React from "react";
import { Grid } from "@mui/material";
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { AppDashboard } from "../../components/areaChart";
import TextField from "@mui/material/TextField";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { convertDigits } from "persian-helpers";
import { format } from "date-fns-jalali";

import { PaginationTable } from "../../components/pagination";
import {
  UserIcon,
  Polygon1,
  Polygon2,
  Polygon3,
  PopupCity,
  IconReportPhone,
  DownloadIconInstruc,
} from "../../components/icons";
import { useTranslation } from "react-i18next";
import doc from "./doc.png";
import { useDispatchAction } from "../../hooks/useDispatchAction";
import { useDispatch, useSelector } from "react-redux";
import { instructionsAction } from "../../actions/instructions";
import Paper from "@mui/material/Paper";
import { HeaderPage } from "../../components/headerPage";

export const Instructions = () => {
  const { t, i18n } = useTranslation();
  const { status, entities } = useSelector((state) => state.instructionsSlice);
  useDispatchAction(instructionsAction, status);


  const options = React.useMemo(() => {
    const res = {
      data: entities?.data?.instructions.data,
      entities: {
        data: {
          total: entities?.data?.instructions.total,
        },
      },
    };
    return res;
  }, [status]);

  return (
    <>
      <HeaderPage title={t("instructions")} />

      <Grid container spacing={2} justifyContent="flex-end">
        {options?.data?.map((e, i) => {
          return (
            <Grid item key={i} xs={6} sm={3} md={2}>
              <Card sx={{ padding: "12px", width: "176px", height: "224px" }}>
                <Grid container mb={2}>
                  <img src={doc} />
                </Grid>

                <Grid container mb={2} justifyContent="center" dir="rtl">
                  <Typography>
                    {" "}
                    {convertDigits(
                      format(new Date(e?.created_at), "yyyy/MM/dd")
                    )}
                  </Typography>
                </Grid>
                <Grid container justifyContent={"center"} textAlign="center">
                  <Typography fontSize={"15px"}>{e.name}</Typography>
                </Grid>
                <Grid container justifyContent={"center"} textAlign="center">
                  <Button
                    fullWidth
                    sx={{ background: "#5041BC", color: "white" }}
                  >
                    <DownloadIconInstruc />
                    <a
                      href={`http://10.154.65.29:9000/${e.path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "23px",
                        color: "white",
                      }}
                    >
                      <Typography
                        fontSize={"12px"}
                        sx={{ paddingRight: "2px" }}
                      >
                        {t("download")}
                      </Typography>
                    </a>
                  </Button>
                </Grid>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Paper>
        <PaginationTable
          status={status}
          entities={options.entities}
          action={instructionsAction}
        />
      </Paper>
    </>
  );
};
