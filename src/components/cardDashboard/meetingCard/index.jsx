import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import { Card, CardHeader, Divider } from "@mui/material";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { format } from "date-fns-jalali";
import moment from "moment";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { convertDigits } from "persian-helpers";
import {
  Curve,
  ClientIcone,
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
} from "../../../components/icons";
import { Typography } from "@mui/material";
export const MeetingCard = ({
    meetings,
    status,
    handleClick,
    handleToPage,
  }) => {
    const { t, i18n } = useTranslation();
    const options = React.useMemo(() => {
      const res = {
        meetings,
      };
      return res;
    }, [status]);
    return (
      <>
        {" "}
        <Grid
          container
          justifyContent={"space-between"}
          alignItems="center"
          mb={2}
          mt={2}
        >
          <Typography>{t("meeting")}</Typography>
          <IconButton aria-label="menu" onClick={handleClick}>
            <PlusIcon />
          </IconButton>
        </Grid>
        {options?.meetings?.map((e, i) => (
          <>
            <Grid
              container
              justifyContent={"space-between"}
              alignItems="center"
              mb={2}
              mt={2}
              sx={{ cursor: "pointer" }}
              onClick={handleToPage}
            >
              <Typography>{e?.client?.name}</Typography>
              <IconButton
                aria-label="menu"
                //   onClick={() => handleDelete(row.id)}
              >
                <OptionIcone />
              </IconButton>
            </Grid>
            <Grid
              container
              justifyContent={"space-between"}
              mb={2}
              mt={2}
              alignItems="center"
              alignContent={"center"}
            >
              <Typography
                align="center"
                sx={{
                  background: "#E6FFF6",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                  height: "25px",
                  borderRadius: "4px",
                  width: "90px",
                }}
                color={"#017874"}
              >
                {convertDigits(format(new Date(e?.start), "HH:mm"))}
              </Typography>
              <Grid item>
                <Grid container alignItems={"center"}>
                  <Typography fontSize={14}>
                    {moment(new Date(e?.start)).format("dddd")}{" "}
                    {convertDigits(format(new Date(e?.start), "dd"))}
                    {"ام"} {format(new Date(e?.start), "MMMM")}{" "}
                    {convertDigits(format(new Date(e?.start), "Y"))}
                  </Typography>
                  <IconButton
                    aria-label="menu"
                    //   onClick={() => handleDelete(row.id)}
                  >
                    <RemoveCalender />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Divider
              sx={{
                display: options?.meetings?.length - 1 === i ? "none" : "block",
                borderColor: "black",
              }}
            />
          </>
        ))}
      </>
    );
  };