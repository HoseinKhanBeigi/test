import React, { useEffect, useMemo, useRef, useState } from "react";
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

import {
  clientsList,
  deleteClient,
  clientDetail,
  clientOrganization,
} from "../../actions/clients";
import { TrashIcone, OptionIcone, EditIcon } from "../../components/icons";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import { ClientCard } from "../../components/clientsCard";
import { responseMessage } from "../../features/messageLog";
import Notifier from "../../components/notify";
import Skeleton from "@mui/material/Skeleton";
import { Confirmation } from "../../components/confirmation";
import { useDispatchAction } from "../../hooks/useDispatchAction";
import { useCheckBox } from "../../hooks/useCheckBox";
import noresult from "../interactions/noresult.png";
import {
  dropDownAction,
  filterAction,
  CheckBoxAction,
  filterList,
} from "../../features/filter";
import { SelectInput } from "../../components/selectInput";
import { dashboardApp } from "../../actions/profile";
import { handleLoading } from "../../features/loading";

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
  const paramSearch = { ...getQueryParams() };

  useEffect(() => {
    dispatch(handleLoading({ status:statusClient }));
  }, [statusClient]);

  // console.log(paramSearch);

  // useEffect(() => {
  //   if (statusClient === "idle") {
  //     dispatch(dashboardApp({})).then((e) => {
  //       if (!paramSearch) {
  //         dispatch(
  //           clientsList({
  //             params: { user: e.payload.data?.user?.level },
  //           })
  //         );
  //         navigate({
  //           search: `?${createSearchParams({
  //             user: e.payload.data?.user?.level,
  //           })}`,
  //         });
  //       } else {
  //         dispatch(
  //           clientsList({
  //             params: paramSearch,
  //           })
  //         );
  //       }
  //     });
  //   }
  // }, [statusClient, dispatch]);

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
    t("مدیر ارتباط مستقیم"),
    "",
  ];

  const { statusDashboard, entitiesDashboard, error } = useSelector(
    (state) => state.dashboardAppSlice
  );

  const handleNavigate = (id) => {
    navigate(`/clients/update/${id}`);
    dispatch(clientDetail({ id }));
    dispatch(clientOrganization({}));
  };

  const handleClick = (id) => {
    if (
      entitiesDashboard?.data?.user?.super_admin === 1 ||
      entitiesDashboard?.data?.user.permissions.some(
        (e) => e.name === "client_show"
      )
    ) {
      navigate(`/clients/${id}`);
      dispatch(clientDetail({ id }));
    }
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
    navigate("/clientsCard");
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

  const { filterRMTabs } = useSelector((state) => state.tabSlice);
  const { initialDropsClient } = useSelector((state) => state.filterSlice);

  useEffect(() => {
    const item = initialDropsClient.map((items) =>
      items.values.find((e) => e.title === paramSearch.type)
    );

    const itemGender = initialDropsClient.map((items) =>
      items.values.find((e) => e.title === paramSearch.gender)
    );

    if (paramSearch?.type) {
      dispatch(
        filterAction({
          type: "RADIO",
          title: paramSearch.type,
          name: "initialDropsClient",
          item: item[0],
        })
      );
    }
    if (paramSearch?.gender) {
      dispatch(
        filterAction({
          type: "RADIO",
          title: paramSearch.gender,
          name: "initialDropsClient",
          item: itemGender[1],
        })
      );
    }
  }, [statusClient]);

  const handleChange = (item) => {
    dispatch(
      dropDownAction({
        type: `DROPDOWN`,
        title: item.title,
        name: "initialDropsClient",
      })
    );
  };

  const handleChangeCheckBox = (item) => {
    dispatch(
      filterAction({
        type: "CHECKBOX",
        title: item.title,
        name: "initialDropsClient",
        item,
      })
    );
  };

  const handleChangeRadio = (item) => {
    console.log(item, "radio");
    dispatch(
      filterAction({
        type: "RADIO",
        title: item.title,
        name: "initialDropsClient",
        item,
      })
    );
  };

  const [typeSearch, setTypeSearch] = React.useState("");

  const hanldeChangeTypeSearch = (event) => {
    setTypeSearch(event.target.value);
    navigate(`/${event.target.value}`);
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
        width={120}
        action={clientsList}
        filterRMTabs={filterRMTabs}
        initialDrops={initialDropsClient}
        handleChange={handleChange}
        changeview={handleChangeView}
        handleChangeCheckBox={handleChangeCheckBox}
        handleChangeRadio={handleChangeRadio}
        defaultQuery={{ ...getQueryParams() }}
        clientList
      >
        <SelectInput
          hanldeChangeTypeSearch={hanldeChangeTypeSearch}
          setTypeSearch={setTypeSearch}
          typeSearch={typeSearch}
          t={t}
        />
      </HeaderPage>
      <Grid container>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            height: "80vh",
            justifyContent: "space-between",
            background: "#fff",
            // overflowX: "scroll",
          }}
        >
          {view ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                rowGap: 2,
              }}
              dir="rtl"
            >
              {statusClient === "succeeded" &&
                clietList?.data?.data.map((row, i) => {
                  return (
                    <ClientCard
                      key={i}
                      type={row.type}
                      national_identifier={convertDigits(row.national_number)}
                      name={row.name}
                      totalPoint={row?.last_bi?.RANK}
                      biPoint={row?.bi_point}
                    />
                  );
                })}
            </Box>
          ) : (
            <>
              <Paper>
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
                    <TableBody>
                      {statusClient !== "succeeded"
                        ? [...Array(10)].map((_, i) => (
                            <TableRow role="checkbox" key={i}>
                              {[...Array(9)].map((_, k) => (
                                <TableCell>
                                  <Box>
                                    <Skeleton
                                      key={k}
                                      width={40}
                                      variant="rectangular"
                                      sx={{ my: 4, mx: 1 }}
                                    />
                                  </Box>
                                </TableCell>
                              ))}
                            </TableRow>
                          ))
                        : clietList?.data?.data.map((row, i) => {
                            return (
                              <TableRow role="checkbox" key={i}>
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    color="primary"
                                    checked={
                                      useCheckBoxSelector.items[i].checked
                                    }
                                    onClick={() => handleSelect(row.id)}
                                  />
                                </TableCell>
                                <TableCell
                                  onClick={() => handleClick(row.id)}
                                  align="left"
                                  sx={{
                                    color: "#2563EB",
                                    cursor:
                                      entitiesDashboard?.data?.user
                                        ?.super_admin === 1
                                        ? "pointer"
                                        : entitiesDashboard?.data?.user.permissions.some(
                                            (e) => e.name !== "client_create"
                                          )
                                        ? "pointer"
                                        : "auto",
                                  }}
                                >
                                  {row?.name}
                                </TableCell>
                                <TableCell align="left">
                                  {row?.bi_point}
                                </TableCell>
                                <TableCell align="left">
                                  {convertDigits(row?.national_identifier) ||
                                    convertDigits(row?.national_number)}
                                </TableCell>
                                <TableCell align="left">
                                  {convertDigits(row?.last_bi?.RANK_B)}
                                </TableCell>
                                <TableCell align="left">
                                  {convertDigits(row?.last_bi?.RANK_C)}
                                </TableCell>
                                <TableCell align="left">
                                  {convertDigits(row?.last_bi?.RANK_I)}
                                </TableCell>
                                <TableCell align="left">
                                  {convertDigits(row?.last_bi?.RANK_P)}
                                </TableCell>
                                <TableCell align="left">
                                  {convertDigits(row?.last_bi?.RANK)}
                                </TableCell>
                                <TableCell align="left">
                                  {row?.user?.name}
                                </TableCell>
                                <TableCell align="left">
                                  <Grid
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
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
                            );
                          })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
              <Paper sx={{ display: "flex", justifyContent: "center" }}>
                {statusClient === "succeeded" &&
                  (clietList?.data?.total === 0 ||
                    clietList?.data?.data?.length === 0) && (
                    <img src={noresult} />
                  )}
              </Paper>
            </>
          )}

          <Paper>
            <PaginationTable
              status={statusClient}
              entities={clietList}
              action={clientsList}
            />
          </Paper>
        </Box>
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
