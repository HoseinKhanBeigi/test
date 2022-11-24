import React, { useEffect, useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { Outlet } from "react-router-dom";
import { Typography, Card } from "@mui/material";
import Pagination from "@mui/material/Pagination";

import { TableHoc } from "../../components/table";
import { usersList } from "../../actions/users";
import { TrashIcone, OptionIcone, EditIcon } from "../../components/icons";

export const Users = () => {
  const { t, i18n } = useTranslation();
  const header = [
    t("fullName"),
    t("countUser"),
    t("placeAction"),
    t("changing"),
    t("phonenumber"),
    "",
  ];
  const handleClick = () => {
    // navigate("create");
  };


  const [progress, setProgress] = React.useState(0);
  const dispatch = useDispatch();
  const { status, entities, error } = useSelector((state) => state.userList);

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
        flexDirection={"column"}
        justifyContent="end"
        alignItems={"end"}
      >
        <Grid item mb={2}>
          <Typography className="title">{t("usersList")}</Typography>
        </Grid>
      </Grid>
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
                  {status === "succeeded" && list(entities)
                      .map((row, i) => {
                        console.log(row);
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
                entities?.data?.data.length > 10
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
    </>
  );
};
