import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import { Card, CardHeader, Divider } from "@mui/material";
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

export const CardNote = () => {
  const { t, i18n } = useTranslation();
  const test = [1, 2];
  return (
    <Card sx={{ padding: "16px", height: "100%" }}>
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
      {test.map((e, i) => (
        <>
          <Grid
            container
            justifyContent={"space-between"}
            mb={2}
            mt={2}
            alignItems="center"
            alignContent={"center"}
          >
            <Typography>{"عباسی 4587562"}</Typography>
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
              display: test.length - 1 === i ? "none" : "block",
              borderColor: "black",
            }}
          />
        </>
      ))}
    </Card>
  );
};

export const MeetingCard = () => {
  const { t, i18n } = useTranslation();
  const test = [1, 2];
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
      {test.map((e, i) => (
        <>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems="center"
            mb={2}
            mt={2}
          >
            <Typography>{"پتروشیمی"}</Typography>
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
                  {"یکشنبه 13 ام آذر ماه 1401"}
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
              display: test.length - 1 === i ? "none" : "block",
              borderColor: "black",
            }}
          />
        </>
      ))}
    </>
  );
};

export const CountClients = ({ count, percent }) => {
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
            {"تعداد مشتریان مستقیم"} {`${count} نفر`}
          </Typography>
        </Grid>
        <Grid container justifyContent={"center"} mt={1} mb={2}>
          <Typography
            fontSize={12}
            color="#017874"
          >{`${percent}% از کل پرتفوی مشتریان`}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
};
