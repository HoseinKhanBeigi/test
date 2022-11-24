import React, { useEffect } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import {
  UserIcon,
  Polygon1,
  Polygon2,
  Polygon3,
  PopupCity,
  IconReportPhone,
  DownloadIconInstruc,
} from "../../components/icons";

import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Box, Card, Link, Typography, Stack } from "@mui/material";

import Pagination from "@mui/material/Pagination";
import { TableHoc } from "../../components/table";
import { usersList } from "../../actions/users";
import { TrashIcone, OptionIcone, EditIcon } from "../../components/icons";

export const Clients = () => {
  const header = [
    "fullName",
    "countUser",
    "placeAction",
    "changing",
    "phone",
    "",
  ];
  const handleClick = () => {
    navigate("create");
  };

  const navigate = useNavigate();

  function createData(fullName, countUser, placeAction, changing, phone) {
    return { fullName, countUser, placeAction, changing, phone };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.userList);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (status === "idle") {
      dispatch(usersList());
    }
  }, [dispatch, status]);
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
      <Grid container>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table" dir="rtl">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#EFF3F3" }}>
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" />
                    </TableCell>
                    {header.map((e, i) => (
                      <TableCell align="right" key={i}>
                        {e}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, i) => (
                    <TableRow key={i} role="checkbox">
                      <TableCell padding="checkbox">
                        <Checkbox color="primary" />
                      </TableCell>
                      <TableCell align="right">{row.fullName}</TableCell>
                      <TableCell align="right">{row.countUser}</TableCell>
                      <TableCell align="right">{row.placeAction}</TableCell>
                      <TableCell align="right">{row.changing}</TableCell>
                      <TableCell align="right">{row.phone}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          sx={{ p: "10px" }}
                          aria-label="menu"
                          onClick={handleClick}
                        >
                          <TrashIcone />
                        </IconButton>
                        <IconButton
                          sx={{ p: "10px" }}
                          aria-label="menu"
                          onClick={handleClick}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          sx={{ p: "10px" }}
                          aria-label="menu"
                          onClick={handleClick}
                        >
                          <OptionIcone />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Pagination
                count={10}
                color="secondary"
                sx={{
                  "& > *": {
                    paddingTop: "72px !important",
                    paddingBottom: "12px !important",
                    justifyContent: "center",
                  },
                }}
              />
            </TableContainer>
          </Paper>
        </Box>
        <Grid container>
          <Grid item>
            <Card sx={{ padding: "12px", width: "210px", height: "175px" }}>
              <Grid container mb={2} justifyContent={"space-between"} dir="rtl">
                <Typography
                  color={"#fff"}
                  sx={{
                    background: "#F6541E",
                    padding: "4px",
                    borderRadius: "24px",
                  }}
                >
                  {t("real")}
                </Typography>
                <Typography>{"مس رفسنجان"}</Typography>
              </Grid>

              <Grid container mb={2} justifyContent="center">
                <Typography color="#017874">4001236589</Typography>
              </Grid>

              <Grid
                container
                justifyContent={"space-between"}
                textAlign="center"
                dir="rtl"
              >
                <Typography>{"امتیاز کل: 125"}</Typography>
                <Typography>{"A+"}</Typography>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
