import React, { useEffect, useRef, useState, useMemo } from "react";

import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useTranslation } from "react-i18next";
import Notifier from "../../components/notify";
import Box from "@mui/material/Box";
import { PaginationTable } from "../../components/pagination";
import { responseMessage } from "../../features/messageLog";
import MenuItem from "@mui/material/MenuItem";
import { callsAction, deleteCalls } from "../../actions/calls";
import { TrashIcone, OptionIcone, EditIcon } from "../../components/icons";
import { getQueryParams } from "../../utils";
import { initialTabs, initialDrops } from "./filterItems";
import { Typography } from "@mui/material";
import { createSearchParams, useNavigate } from "react-router-dom";
import { HeaderPage } from "../../components/headerPage";
import { Confirmation } from "../../components/confirmation";
import {
  addMonths,
  format,
  getMonth,
  setMonth,
  setYear,
  subMonths,
} from "date-fns-jalali";
import { convertDigits } from "persian-helpers";
import moment from "moment";

export const Calls = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userid, setUserId] = React.useState();
  const open = Boolean(anchorEl);
  const handleFilterMenu = (event, id) => {
    setUserId(id);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const { t } = useTranslation();

  const header = [
    t("fullName"),
    t("timeStart"),
    t("timeEnd"),
    t("date"),
    t("callSubject"),
    t("numberCall"),
    "",
  ];

  const dispatch = useDispatch();
  const { status, entities, error } = useSelector(
    (state) => state.callListSlice
  );

  useEffect(() => {
    const params = { page: 1 };
    navigate({
      search: `?${createSearchParams(params)}`,
    });
    dispatch(callsAction({ params: { page: 1, ...getQueryParams() } }));
  }, []);

  const handleNavigate = (id) => {
    navigate(`/interactions/calls/update/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteCalls({ id })).then((res) => {
      if (res.payload.status === 200) {
        dispatch(responseMessage(res.payload.message));
        dispatch(callsAction({ params: { ...getQueryParams() } }));
        setOpenConfirmation(false);
      }
    });
  };


  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [stateId,setStateId] = useState()

  const handleClickConfirmation = (id) => {
    setOpenConfirmation(true);
    setStateId(id)
  };


  return (
    <>
      <HeaderPage
        title={t("callsList")}
        action={callsAction}
        entities={entities}
        status={status}
        initialDrops={initialDrops}
        page="table"
        defaultQuery={{ ...getQueryParams() }}
        dateFilter
      />
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
                    <TableCell align="left" key={i}>
                      {e}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {status === "succeeded" &&
                  entities?.data?.data.map((row, i) => {
                    return (
                      <TableRow key={i} role="checkbox">
                        <TableCell padding="checkbox">
                          <Checkbox color="primary" />
                        </TableCell>
                        <TableCell align="left">{row?.client?.name}</TableCell>
                        <TableCell align="left" sx={{width:"120px"}}>
                          {convertDigits(
                            format(new Date(row?.start), "HH:mm")
                          )}
                        </TableCell>
                        <TableCell align="left" width={"300px"}>
                          {convertDigits(
                            format(new Date(row?.end), "HH:mm")
                          )}
                        </TableCell>
                    

                        <TableCell align="left">
                          {convertDigits(
                            format(new Date(row?.start), "yyyy-MM-dd")
                          )}
                        </TableCell>
                        <TableCell align="left">{row?.topic}</TableCell>
                        <TableCell align="left">{row?.phone}</TableCell>
                        <TableCell
                          align="left"
                    
                        >
                          <Grid       sx={{ display: "flex", flexDirection: "row" }}>
                          <IconButton
                            sx={{ p: "10px" }}
                            aria-label="menu"
                            onClick={() => handleClickConfirmation(row.id)}
                          >
                            <TrashIcone />
                          </IconButton>
                          <IconButton
                            sx={{ p: "10px" }}
                            aria-label="menu"
                            onClick={() => handleNavigate(row.id)}
                          >
                            <EditIcon />
                          </IconButton>

                          <IconButton
                            sx={{ p: "10px" }}
                            aria-label="menu"
                            //   onClick={(e) => handleFilterMenu(e, row.id)}
                          >
                            <OptionIcone />
                          </IconButton>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Paper sx={{ display: "flex", justifyContent: "center" }}>
          {status === "succeeded" &&
            (entities?.data?.total === 0 ||
              entities?.data?.dada?.length === 0) && (
              <Typography>{t("no data")}</Typography>
            )}
        </Paper>
        <Paper>
          <PaginationTable
            status={status}
            entities={entities}
            action={callsAction}
          />
        </Paper>
      </Box>
      <Confirmation
        statusConfirmation={openConfirmation}
        stateId={stateId}
        setOpenConfirmation={setOpenConfirmation}
        msg={"حذف تماس"}
        bodymsg={"آیا می خواهید تماس را حذف کنید؟"}
        handleExecution={handleDelete}
      />
      <Notifier />
    </>
  );
};
