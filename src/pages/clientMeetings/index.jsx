import React, { useEffect, useState } from "react";
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
import Box from "@mui/material/Box";
import { userDetail, clientMeetingsAction } from "../../actions/clients";
import { format } from "date-fns-jalali";
import Notifier from "../../components/notify";
import { responseMessage } from "../../features/messageLog";
import { TrashIcone, OptionIcone, EditIcon } from "../../components/icons";
import { getQueryParams } from "../../utils";
// import { initialDrops } from "./filterItems";
import { Typography } from "@mui/material";
import { convertDigits } from "persian-helpers";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { useDispatchAction } from "../../hooks/useDispatchAction";
import { HeaderPage } from "../../components/headerPage";
import { PaginationTable } from "../../components/pagination";
import { Confirmation } from "../../components/confirmation";
import noresult from "../interactions/noresult.png";

export const ClientMeetings = () => {
  const [deleteState, setDeleteState] = React.useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const { t } = useTranslation();

  const header = [
    t("client"),
    t("date"),
    t("timeStart"),
    t("timeEnd"),
    t("meetingSubject"),
    t("dirctor"),
    t("attachment"),
    "",
  ];

  const dispatch = useDispatch();
  const { status, entities, error } = useSelector(
    (state) => state.clientMeetingSlice
  );

  // useDispatchAction(userMeetingsAction, status);

  useEffect(() => {
    const id = params.id;
    if (status === "idle") {
      dispatch(
        clientMeetingsAction({
          id,
        })
      );
    }
  }, [status, dispatch]);

  const handleNavigate = (id, row) => {
    // navigate(`/interactions/meetings/update/${id}`);
    // dispatch(meetingDetail({ id }));
    // dispatch(MeetingsDepenAgent({ id: row.client_id }));
    // dispatch(meetingDependencies({}))
  };

  const handleDelete = (id) => {
    // dispatch(deleteMeeting({ id })).then((res) => {
    //   if (res.payload.status === 200) {
    //     setDeleteState(true);
    //     dispatch(responseMessage(res.payload.message));
    //     dispatch(meetingsList({ params: { ...getQueryParams() } }));
    //     setOpenConfirmation(false);
    //   }
    // });
  };

  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [stateId, setStateId] = useState();

  const handleClickConfirmation = (id) => {
    setOpenConfirmation(true);
    setStateId(id);
  };

  return (
    <>
      <HeaderPage
        title={t("meetingList")}
        action={clientMeetingsAction}
        entities={entities}
        status={status}
        // initialDrops={initialDrops}
        paramsId={params.id}
        page="table"
        defaultQuery={{ ...getQueryParams() }}
        dateFilter
        filterPage
        download
        searchPage
      />
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
                          <TableCell align="left">
                            {row?.client?.name}
                          </TableCell>
                          <TableCell align="left">
                            {convertDigits(
                              format(new Date(row?.start), "yyyy/MM/dd")
                            )}
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{ width: "100px", color: "#017874" }}
                          >
                            {convertDigits(
                              format(new Date(row?.start), " HH:mm")
                            )}
                          </TableCell>
                          <TableCell
                            align="left"
                            width={"300px"}
                            sx={{ color: "#017874" }}
                          >
                            {convertDigits(
                              format(new Date(row?.end), " HH:mm")
                            )}
                          </TableCell>
                          <TableCell align="left">{row?.topic}</TableCell>
                          <TableCell align="left">{row?.owner?.name}</TableCell>

                          <TableCell align="left">
                            {row?.attach === null ? "ندارد" : "دارد"}
                          </TableCell>
                          <TableCell>
                            <Grid
                              sx={{ display: "flex", flexDirection: "row" }}
                            >
                              <IconButton
                                aria-label="menu"
                                onClick={() => handleClickConfirmation(row.id)}
                              >
                                <TrashIcone />
                              </IconButton>
                              <IconButton
                                aria-label="menu"
                                onClick={() => handleNavigate(row.id, row)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                aria-label="menu"
                                // onClick={(e) => handleFilterMenu(e, row.id)}
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
                entities?.data?.dada?.length === 0) && <img src={noresult} />}
          </Paper>
          <Paper>
            <PaginationTable
              status={status}
              entities={entities}
              action={clientMeetingsAction}
            />
          </Paper>
        </Box>
        {deleteState && <Notifier />}
        <Confirmation
          statusConfirmation={openConfirmation}
          stateId={stateId}
          setOpenConfirmation={setOpenConfirmation}
          msg={"حذف جلسه"}
          bodymsg={"آیا می خواهید جلسه را حذف کنید؟"}
          handleExecution={handleDelete}
        />
      </Grid>
    </>
  );
};
