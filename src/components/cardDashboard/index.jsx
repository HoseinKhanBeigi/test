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
} from "../../components/icons";
import { Typography } from "@mui/material";
import "./index.css";

export const CardNote = ({ notes, status }) => {
  const { t, i18n } = useTranslation();
  const options = React.useMemo(() => {
    const res = {
      notes,
    };
    return res;
  }, [status]);

  return (
    <Card sx={{ padding: "16px" }}>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems="center"
        mb={1}
        sx={{ paddingLeft: "12px", paddingRight: "12px" }}
      >
        <Typography>{t("note")}</Typography>
        <IconButton
          aria-label="menu"
          //   onClick={() => handleDelete(row.id)}
        >
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
          >
            <Typography>{e?.title}</Typography>
            <Typography
              sx={{
                background: "#DBEAFE",
                paddingTop: "4px",
                paddingBottom: "4px",
                height: "25px",
                borderRadius: "4px",
                width: "90px",
              }}
              color="#2563EB"
              align="center"
            >
              {"12 - 2"}
            </Typography>

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

export const MeetingCard = ({ meetings, status }) => {
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
        sx={{ paddingLeft: "12px", paddingRight: "12px" }}
      >
        <Typography>{t("meeting")}</Typography>
        <IconButton
          aria-label="menu"
          //   onClick={() => handleDelete(row.id)}
        >
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
              {"12-2"}
            </Typography>
            <Grid item>
              <Grid container alignItems={"center"}>
                <Typography fontSize={14}>
                  {moment(new Date(e?.start)).format("dddd")}{" "}
                  {moment(new Date(e?.start)).format("d")}{"ام"}{" "}
                  {format(new Date(e?.start), "MMMM")}{" "}
                  {format(new Date(e?.start), "Y")}
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

export const CountClients = ({ count, percent, status }) => {
  const option = React.useMemo(() => {
    const res = {
      percent,
      count,
    };
    return res;
  }, [status]);

  return (
    <Card sx={{ padding: "16px", height: "100%" }}>
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Grid container mt={3} justifyContent={"center"}>
          <IconButton>
            <ClientIcone />
          </IconButton>
        </Grid>
        <Grid container justifyContent={"center"} mt={2} mb={1}>
          <Typography fontSize={12} align="center">
            {"تعداد مشتریان مستقیم"} {`${option.count} نفر`}
          </Typography>
        </Grid>
        <Grid container justifyContent={"center"} mt={1} mb={2}>
          <Typography
            fontSize={12}
            color="#017874"
          >{`${option.percent}% از کل پرتفوی مشتریان`}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export const TargetCard = () => {
  return (
    <Card sx={{ padding: "16px", height: "100%" }}>
      <Grid container rowSpacing={6}>
        <Grid item container justifyContent={"space-between"}>
          <Typography>{"فاصله شما نسبت به هدف"}</Typography>
          <Box sx={{ position: "relative" }}>
            <input
              className="toggle"
              type="checkbox"
              role="switch"
              name="toggle"
              value="on"
            ></input>
            <Box
              sx={{
                position: "absolute",
                top: 3,
                display: "flex",
                width: "253px",
                paddingLeft: "12px",
                paddingRight: "20px",
                justifyContent: "space-between",
              }}
            >
              <span>خود</span>
              <span>هم گروه ها</span>
            </Box>

            {/* <Typography>{"خود"}</Typography> */}
          </Box>
        </Grid>
        <Grid item container>
          <RankBox background={"#F6541E"} val="رتبه شما" />
          <RankBox background={"#F6541E"} val="هدف" />
        </Grid>
        <Grid item container justifyContent="end">
          <Box
            sx={{
              width: "100%",
              maxWidth: "480px",
              height: "10px",
              background: "rgba(0, 0, 0, 0.12)",
              borderRadius: "28px",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: "80%",
                height: "10px",
                background: "#F7541E",
                borderRadius: "28px",
                position: "absolute",
              }}
            ></Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export const RankBox = ({ background, val }) => {
  return (
    <Grid container item xs alignItems={"center"} gap={2}>
      <Box sx={{ width: "30px", height: "4px", background }} />
      <Typography>{val}</Typography>
    </Grid>
  );
};
