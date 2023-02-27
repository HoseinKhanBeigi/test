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




export const NoteCard = ({ notes, status, handleClick, handleToPage }) => {
  const { t, i18n } = useTranslation();
  const options = React.useMemo(() => {
    const res = {
      notes,
    };
    return res;
  }, [status]);

  return (
    <Card sx={{ padding: "16px", height: "100%" }}>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems="center"
        mb={1}
      >
        <Typography>{t("note")}</Typography>
        <IconButton aria-label="menu" onClick={handleClick}>
          <PlusIcon />
        </IconButton>
      </Grid>
      {options?.notes?.map((e, i) => (
        <>
          <Grid
            container
            justifyContent={"space-between"}
            mb={2}
            mt={2}
            alignItems="center"
            alignContent={"center"}
            sx={{ cursor: "pointer" }}
            onClick={handleToPage}
          >
            <Typography>{e?.client.name}</Typography>

            <IconButton
              aria-label="menu"
              //   onClick={() => handleDelete(row.id)}
            >
              <OptionIcone />
            </IconButton>
          </Grid>
          <Divider
            sx={{
              display: options?.notes?.length - 1 === i ? "none" : "block",
              borderColor: "black",
            }}
          />
        </>
      ))}
    </Card>
  );
};