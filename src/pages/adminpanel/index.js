import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";


import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import { useRef } from "react";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";
import { usersList } from "../../actions/users";
import {
  Filled,
  SeenMessage,
  AllMessage,
  PhoneIcon,
  PhoneOption,
  UploadIcon,
  SendIcon,
  TrashIcone, OptionIcone, EditIcon
} from "../../components/icons";
import { useNavigate } from "react-router-dom";
export const AdminPanel = () => {
  const [currentSelect, setCurrentSelect] = useState([
    { state: true, name: "all" },
    { state: false, name: "all2" },
    { state: false, name: "all3" },
    { state: false, name: "all4" },
    { state: false, name: "all5" },
    { state: false, name: "all6" },
  ]);
  const handleClick = (event) => {
    const newState = currentSelect.map((e) => {
      if (e.name === event.currentTarget.getAttribute("data-name")) {
        return {
          ...e,
          state: true,
        };
      } else {
        return {
          ...e,
          state: false,
        };
      }
    });

    setCurrentSelect(newState);
  };
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const handleAccess = () => {
    // navigate("access");
  };

  const header = [
    t("fullName"),
    t("countUser"),
    t("placeAction"),
    t("changing"),
    t("phonenumber"),
    "",
  ];



  const [progress, setProgress] = React.useState(0);
  const dispatch = useDispatch();
  const { status, entities, error } = useSelector((state) => state.userListSlice);

  useEffect(() => {
    if (status === "idle") {
      dispatch(usersList());
    }
  }, [dispatch, status]);

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const list = (dataTb) => {
    if (dataTb?.data?.data.length > 10) {
      return dataTb?.data?.data.slice(
        (page - 1) * rowsPerPage,
        (page - 1) * rowsPerPage + rowsPerPage
      );
    } else if (dataTb?.data?.data.length < 10) {
      return dataTb?.data?.data;
    }
  };
  return (
    <>
      <Grid
        container
        dir="rtl"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Grid item>
          <Grid
            item
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "760px" }}
          >
            <Grid item>
              <Typography>{t("adminpanel")}</Typography>
            </Grid>

            <Grid item>
              <Grid
                container
                justifyContent="space-between"
                sx={{ width: "432px" }}
              >
                <Grid item padding={1} onClick={handleClick} data-name="all">
                  <Button
                    sx={{
                      color: currentSelect[0].state ? "#ffffff" : "",
                      background: currentSelect[0].state ? "#017874" : "",
                    }}
                    onClick={handleAccess}
                  >
                    {t("accessiblity")}
                  </Button>
                </Grid>
                <Grid item padding={1} onClick={handleClick} data-name="all2">
                  <Button
                    sx={{
                      color: currentSelect[1].state ? "#ffffff" : "",
                      background: currentSelect[1].state ? "#017874" : "",
                    }}
                  >
                    {t("branches")}
                  </Button>
                </Grid>
                <Grid item padding={1} onClick={handleClick} data-name="all3">
                  <Button
                    sx={{
                      color: currentSelect[2].state ? "#ffffff" : "",
                      background: currentSelect[2].state ? "#017874" : "",
                    }}
                  >
                    {t("smsGate")}
                  </Button>
                </Grid>
                <Grid item padding={1} onClick={handleClick} data-name="all4">
                  <Button
                    sx={{
                      color: currentSelect[3].state ? "#ffffff" : "",
                      background: currentSelect[3].state ? "#017874" : "",
                    }}
                  >
                    {t("usermanager")}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {currentSelect[0].state && (
          <>
            <Grid
              container
              dir="rtl"
              justifyContent="end"
              alignItems="center"
              mb={2}
              mt={5}
            >
              <Grid
                container
                sx={{ width: "80%" }}
                justifyContent="space-around"
              >
                <Typography color={"#017874"}>{"بازاریاب"}</Typography>
                <Typography color={"#017874"}>{"بازاریاب ارشد"}</Typography>
                <Typography color={"#017874"}>{"ستادی"}</Typography>
                <Typography color={"#017874"}>{"ستادی ارشد"}</Typography>
                <Typography color={"#017874"}>{"مشتری"}</Typography>
              </Grid>
            </Grid>
            {[
              "پیامک",
              "درج بازاریاب",
              "تعاملات",
              "یادداشت ها",
              "درج مشتری",
              "پروفایل",
              "گزارش خود",
              "گزارش مشتریان",
              "لیست مشتریان خود",
              "لیست مشتریانان",
            ].map((name, i) => {
              return (
                <Grid
                  key={i}
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography>{name}</Typography>
                  <Grid
                    container
                    sx={{ width: "80%" }}
                    justifyContent="space-around"
                  >
                    <FormControlLabel control={<Switch defaultChecked />} />
                    <FormControlLabel control={<Switch defaultChecked />} />
                    <FormControlLabel control={<Switch defaultChecked />} />
                    <FormControlLabel control={<Switch defaultChecked />} />
                    <FormControlLabel control={<Switch defaultChecked />} />
                  </Grid>
                </Grid>
              );
            })}
          </>
        )}

        {currentSelect[1].state && (
                  <Grid container>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      height: "80vh",
                      justifyContent: "space-between",
                      background: "#fff",
                    }}
                  >
                    <Paper sx={{ width: "100%" }}>
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
                            {status === "succeeded" && entities?.data?.data.length > 10
                              ? entities?.data?.data.slice(
                                  (page - 1) * rowsPerPage,
                                  (page - 1) * rowsPerPage + rowsPerPage
                                )
                              : entities?.data?.data.map((row, i) => {
                                  return (
                                    <TableRow key={i} role="checkbox">
                                      <TableCell padding="checkbox">
                                        <Checkbox color="primary" />
                                      </TableCell>
                                      <TableCell align="right">{row.name}</TableCell>
                                      <TableCell align="right">20</TableCell>
                                      <TableCell align="right">
                                        {row.organization}
                                      </TableCell>
                                      <TableCell align="right">{""}</TableCell>
                                      <TableCell align="right">{row.mobile}</TableCell>
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
                                  );
                                })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                    <Paper>
                      <Pagination
                        count={
                          status === "succeeded" && entities?.data?.data.length > 10
                            ? Math.ceil(entities?.data?.data.length / 10)
                            : 1
                        }
                        page={page}
                        onChange={handleChangePage}
                        color="secondary"
                        sx={{
                          "& > *": {
                            paddingTop: "72px !important",
                            paddingBottom: "12px !important",
                            justifyContent: "center",
                          },
                        }}
                      />
                    </Paper>
                  </Box>
                  {/* <Outlet /> */}
                </Grid>
        )}
           {currentSelect[2].state && (
                      <Grid container>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          height: "80vh",
                          justifyContent: "space-between",
                          background: "#fff",
                        }}
                      >
                        <Paper sx={{ width: "100%" }}>
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
                                {status === "succeeded" && entities?.data?.data.length > 10
                                  ? entities?.data?.data.slice(
                                      (page - 1) * rowsPerPage,
                                      (page - 1) * rowsPerPage + rowsPerPage
                                    )
                                  : entities?.data?.data.map((row, i) => {
                                      return (
                                        <TableRow key={i} role="checkbox">
                                          <TableCell padding="checkbox">
                                            <Checkbox color="primary" />
                                          </TableCell>
                                          <TableCell align="right">{row.name}</TableCell>
                                          <TableCell align="right">20</TableCell>
                                          <TableCell align="right">
                                            {row.organization}
                                          </TableCell>
                                          <TableCell align="right">{""}</TableCell>
                                          <TableCell align="right">{row.mobile}</TableCell>
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
                                      );
                                    })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Paper>
                        <Paper>
                          <Pagination
                            count={
                              status === "succeeded" && entities?.data?.data.length > 10
                                ? Math.ceil(entities?.data?.data.length / 10)
                                : 1
                            }
                            page={page}
                            onChange={handleChangePage}
                            color="secondary"
                            sx={{
                              "& > *": {
                                paddingTop: "72px !important",
                                paddingBottom: "12px !important",
                                justifyContent: "center",
                              },
                            }}
                          />
                        </Paper>
                      </Box>
                      {/* <Outlet /> */}
                    </Grid>
        )}
      </Grid>
    </>
  );
};
