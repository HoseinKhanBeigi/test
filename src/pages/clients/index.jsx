import React, { useEffect, useRef, useState } from "react";
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
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { convertDigits } from "persian-helpers";
import Box from "@mui/material/Box";
import { PaginationTable } from "../../components/pagination";
import { HeaderPage } from "../../components/headerPage";
import { getQueryParams } from "../../utils";
import { initialTabs, initialDrops } from "./filterItems";
import {
  clientsList,
  deleteClient,
  clientDetail,
  clientOrganization,
} from "../../actions/clients";
import { TrashIcone, OptionIcone, EditIcon } from "../../components/icons";
import { useNavigate } from "react-router-dom";
import { ClientCard } from "../../components/clientsCard";
import { responseMessage } from "../../features/messageLog";
import Notifier from "../../components/notify";
import Skeleton from "@mui/material/Skeleton";
import { Confirmation } from "../../components/confirmation";
import { useDispatchAction } from "../../hooks/useDispatchAction";
import { useCheckBox } from "../../hooks/useCheckBox";
import {
  dropDownAction,
  CheckBoxAction,
  filterList,
} from "../../features/filter";

export const Clients = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [view, setView] = useState(false);
  const [stateId, setStateId] = useState();
  const [deleteState, setDeleteState] = React.useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const { statusClient, clietList, errorClient } = useSelector(
    (state) => state.clientListSlice
  );
  useDispatchAction(clientsList, statusClient);
  const useCheckBoxSelector = useCheckBox(statusClient, clietList);
  const header = [
    t("name"),
    t("category"),
    t("national_identity"),
    t("Equipment_rating"),
    t("Allocation_rank"),
    t("Service_rating"),
    t("cost_benefit"),
    t("Total_rank"),
    t("بازاریاب مستقیم"),
    "",
  ];

  const handleNavigate = (id) => {
    navigate(`/clients/update/${id}`);
    dispatch(clientDetail({ id }));
    dispatch(clientOrganization({}));
  };

  const handleDelete = (id) => {
    dispatch(deleteClient({ id })).then((res) => {
      if (res.payload.status === 200) {
        setDeleteState(true);
        setOpenConfirmation(false);
        dispatch(responseMessage(res.payload.message));
        dispatch(clientsList({ params: { ...getQueryParams() } }));
      }
    });
  };

  const handleChangeView = () => {
    setView((state) => !state);
  };

  const handleClickConfirmation = (id) => {
    setOpenConfirmation(true);
    setStateId(id);
  };

  const handleSelectAll = (item) => {
    useCheckBoxSelector.dispatchAction({ type: "SELECTALL" });
  };
  const handleSelect = (i) => {
    useCheckBoxSelector.dispatchAction({ type: "SELECTITEM", id: i });
  };

  const { initialDropsClient } = useSelector((state) => state.filterSlice);
  const handleChange = (item) => {
    dispatch(
      dropDownAction({
        type: `DROPDOWN`,
        title: item.title,
        name: "initialDropsClient",
      })
    );
  };

  return (
    <>
      <HeaderPage
        title={t("clientList")}
        entities={clietList}
        status={statusClient}
        page="table"
        filterPage
        download
        searchPage
        tab={true}
        action={clientsList}
        initialTabs={initialTabs}
        initialDrops={initialDropsClient}
        handleChange={handleChange}
        changeview={handleChangeView}
        defaultQuery={{ ...getQueryParams() }}
        clientList
      />
      <Grid container>
        <>
          {view ? (
            <Grid container rowSpacing={2} alignItems={"center"} dir="rtl">
              {statusClient === "succeeded" &&
                clietList?.data?.data.map((row, i) => {
                  return (
                    <Grid item sm={3} key={i}>
                      <ClientCard
                        type={row.type}
                        national_identifier={row.national_identifier}
                        name={row.name}
                        totalPoint={row.total_point}
                        biPoint={row.bi_point}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          ) : (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                height: "80vh",
                justifyContent: "space-between",
                background: "#fff",
                overflowX: "scroll",
              }}
            >
              <Paper
                sx={{
                  overflowX: "scroll",
                }}
              >
                <TableContainer component={Paper}>
                  <Table aria-label="simple table" dir="rtl">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#EFF3F3" }}>
                        <TableCell padding="checkbox">
                          <Checkbox color="primary" onClick={handleSelectAll} />
                        </TableCell>
                        {header.map((e, i) => (
                          <TableCell align="left" key={i}>
                            {e}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    {statusClient !== "succeeded" ? (
                      <TableBody>
                        <TableRow role="checkbox">
                          <Box
                            sx={{
                              height: "max-content",
                              width: "max-content",
                            }}
                          >
                            {[...Array(10)].map((_, i) => (
                              <Skeleton
                                key={i}
                                variant="rectangular"
                                sx={{ my: 4, mx: 1 }}
                              />
                            ))}
                          </Box>
                        </TableRow>
                      </TableBody>
                    ) : (
                      clietList?.data?.data.map((row, i) => {
                        return (
                          <TableBody key={i}>
                            <TableRow role="checkbox">
                              <TableCell padding="checkbox">
                                <Checkbox
                                  color="primary"
                                  checked={useCheckBoxSelector.items[i].checked}
                                  onClick={() => handleSelect(row.id)}
                                />
                              </TableCell>
                              <TableCell align="left" sx={{ color: "#2563EB" }}>
                                {row?.name}
                              </TableCell>
                              <TableCell align="left">
                                {row?.bi_point}
                              </TableCell>
                              <TableCell align="left">
                                {convertDigits(row?.national_identifier) ||
                                  convertDigits(row?.national_number)}
                              </TableCell>
                              <TableCell align="left">{""}</TableCell>
                              <TableCell align="left">
                                {row?.assignment_point}
                              </TableCell>
                              <TableCell align="left">
                                {row?.services_point}
                              </TableCell>
                              <TableCell align="left">
                                {row?.profit_loss}
                              </TableCell>
                              <TableCell align="left">
                                {row?.total_point}
                              </TableCell>
                              <TableCell align="left">
                                {row?.user.name}
                              </TableCell>
                              <TableCell align="left">
                                <Grid
                                  sx={{ display: "flex", flexDirection: "row" }}
                                >
                                  <IconButton
                                    aria-label="menu"
                                    onClick={() =>
                                      handleClickConfirmation(row?.id)
                                    }
                                  >
                                    <TrashIcone />
                                  </IconButton>
                                  <IconButton
                                    aria-label="menu"
                                    onClick={() => handleNavigate(row?.id)}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                  <IconButton
                                    aria-label="menu"
                                    // onClick={handleClick}
                                  >
                                    <OptionIcone />
                                  </IconButton>
                                </Grid>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        );
                      })
                    )}
                  </Table>
                </TableContainer>
              </Paper>
              <Paper sx={{ display: "flex", justifyContent: "center" }}>
                {statusClient === "succeeded" &&
                  (clietList?.data?.total === 0 ||
                    clietList?.data?.dada?.length === 0) && (
                    <Typography>{t("no data")}</Typography>
                  )}
              </Paper>

              <Paper>
                <PaginationTable
                  status={statusClient}
                  entities={clietList}
                  action={clientsList}
                />
              </Paper>
            </Box>
          )}
        </>
        <Confirmation
          statusConfirmation={openConfirmation}
          stateId={stateId}
          setOpenConfirmation={setOpenConfirmation}
          msg={"حذف مشتری"}
          bodymsg={"آیا می خواهید مشتری را حذف کنید؟"}
          handleExecution={handleDelete}
        />
        {deleteState && <Notifier />}
      </Grid>
    </>
  );
};
