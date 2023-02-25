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
  clientCardAction,
} from "../../actions/clients";
import { TrashIcone, OptionIcone, EditIcon } from "../../components/icons";
import { useLocation, useNavigate } from "react-router-dom";
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

export const ClientsCards = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [view, setView] = useState(false);
  const limit = 20;
  const [stateId, setStateId] = useState();
  const [deleteState, setDeleteState] = React.useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const { statusClientCard, clientCards, errorClient } = useSelector(
    (state) => state.clientCardSlice
  );
  const load = useDispatchAction(clientCardAction, statusClientCard, limit);
  console.log(load);
  const useCheckBoxSelector = useCheckBox(statusClientCard, clientCards);
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

  const handleChangeView = () => {
    navigate("/clients");
  };

  const handleNavigate = (id) => {
    navigate(`/clients/update/${id}`);
    dispatch(clientDetail({ id }));
    dispatch(clientOrganization({}));
  };

  const handleClick = (id) => {
    if (entitiesDashboard?.data?.user?.super_admin === 1) {
      navigate(`/clients/${id}`);
      dispatch(clientDetail({ id }));
    } else if (
      entitiesDashboard?.data?.user.permissions.some(
        (e) => e.name === "client_create"
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
        entities={clientCards}
        status={statusClientCard}
        page="table"
        filterPage
        download
        searchPage
        tab={true}
        width={120}
        action={clientCardAction}
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
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, 202px)",
              rowGap: 2,
              columnGap: 2,
            }}
            dir="rtl"
          >
            {statusClientCard === "succeeded" &&
              clientCards?.data?.data.map((row, i) => {
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
          <Paper>
            <PaginationTable
              status={statusClientCard}
              entities={clientCards}
              action={clientCardAction}
              limit={20}
            />
          </Paper>
        </Box>
      </Grid>
    </>
  );
};
