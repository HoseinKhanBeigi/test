import React, { useEffect, useRef, useState, useMemo } from "react";
import { useReducer } from "react";
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
import Notifier from "../../components/notify";
import Skeleton from "@mui/material/Skeleton";
import MenuItem from "@mui/material/MenuItem";
import noresult from "../interactions/noresult.png";
import {
  usersList,
  deleteUser,
  userDetail,
  userOrganization,
  userChildrenAction,
} from "../../actions/users";
import CircularProgress from "@mui/material/CircularProgress";
import {
  TrashIcone,
  OptionIcone,
  EditIcon,
  FlashUp,
  FlashDown,
} from "../../components/icons";
import { getQueryParams } from "../../utils";
import { Typography } from "@mui/material";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { responseMessage } from "../../features/messageLog";
import { HeaderPage } from "../../components/headerPage";
import { MenuItems } from "../../components/menuItems";
import { PaginationTable } from "../../components/pagination";
import { DialogComponent } from "../../components/dialog";
import { Confirmation } from "../../components/confirmation";
import { convertDigits } from "persian-helpers";
import { useDispatchAction } from "../../hooks/useDispatchAction";
import { useCheckBox } from "../../hooks/useCheckBox";
import {
  dropDownAction,
  filterAction,
  filterList,
} from "../../features/filter";
// import { useNavigate } from "react-router-dom";

export const UserChildren = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userid, setUserId] = React.useState();
  const [deleteState, setDeleteState] = React.useState(false);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [stateId, setStateId] = useState();

  const { statusDetail, userDetails } = useSelector(
    (state) => state.userDetailShow
  );

  const handleFilterMenu = (event, id) => {
    setUserId(id);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { t } = useTranslation();

  const header = [
    t("fullName"),
    t("countClients"),
    t("placeAction"),
    t("Average_changes"),
    t("phonenumber"),
    t("طبقه ی مدیر ارتباط"),
    "",
  ];

  const dispatch = useDispatch();
  const { status, entities, error } = useSelector(
    (state) => state.userChildrenSlice
  );

  const { filterRMTabs } = useSelector((state) => state.tabSlice);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleNavigate = (id, organization) => {
    // dispatch(userDetail({ id })).then(() => {
    //   dispatch(
    //     userOrganization({
    //       organization_type: organization,
    //     })
    //   );
    //   navigate(`/users/update/${id}`);
    // });
  };

  const handleUserDetail = (id) => {
    // dispatch(userDetail({ id })).then(() => {
    //   navigate(`/reports/${id}`);
    // });
  };

  const handleDelete = (id) => {
    // dispatch(deleteUser({ id })).then((res) => {
    //   if (res.payload.status === 200) {
    //     setDeleteState(true);
    //     setOpenConfirmation(false);
    //     dispatch(responseMessage(res.payload.message));
    //     dispatch(usersList({ params: { ...getQueryParams() } }));
    //   }
    // });
  };

  const handleClickConfirmation = (id) => {
    // setOpenConfirmation(true);
    // setStateId(id);
  };
  //   useEffect(() => {
  //     const id = params.id;
  //     if (status === "idle") {
  //       dispatch(
  //         userChildrenAction({
  //           id,
  //           params: { level: userDetails.data?.user?.level },
  //         })
  //       );
  //     }
  //   }, [status, dispatch]);

  const paramSearch = { ...getQueryParams() };

  useEffect(() => {
    const id = params.id;
    if (status === "idle") {
      dispatch(
        userDetail({
          id,
        })
      ).then((e) => {
        if (!paramSearch) {
          dispatch(
            userChildrenAction({
              id,
              params: { level: e.payload.data?.user?.level },
            })
          );
        } else {
          dispatch(
            userChildrenAction({
              id,
              params: paramSearch,
            })
          );
        }
      });
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (userDetails?.data) {
      const params = {
        ...getQueryParams(),
        level: userDetails.data?.user?.level,
      };
      navigate({
        search: `?${createSearchParams(params)}`,
      });
    }
  }, [statusDetail]);
  const useCheckBoxSelector = useCheckBox(status, entities);
  const handleSelectAll = (item) => {
    useCheckBoxSelector.dispatchAction({ type: "SELECTALL" });
  };
  const handleSelect = (i) => {
    useCheckBoxSelector.dispatchAction({ type: "SELECTITEM", id: i });
  };

  const { initialDropsUser, filterList } = useSelector(
    (state) => state.filterSlice
  );

  const handleChange = (item) => {
    dispatch(
      dropDownAction({
        type: `DROPDOWN`,
        title: item.title,
        name: "initialDropsUser",
      })
    );
  };

  const handleChangeCheckBox = (item) => {
    dispatch(
      filterAction({
        type: "CHECKBOX",
        title: item.title,
        name: "initialDropsUser",
        item,
      })
    );
  };

  const handleChangeRadio = (item) => {
    dispatch(
      filterAction({
        type: "RADIO",
        title: item.title,
        name: "initialDropsUser",
        item,
      })
    );
  };

  return (
    <>
      {" "}
      <HeaderPage
        title={t("usersList")}
        action={userChildrenAction}
        entities={entities}
        paramsId={params.id}
        status={status}
        filterRMTabs={filterRMTabs}
        initialDrops={initialDropsUser}
        handleChange={handleChange}
        page="table"
        filterPage
        download
        searchPage
        tab={true}
        userDetails={userDetails}
        statusDetail={statusDetail}
        handleChangeCheckBox={handleChangeCheckBox}
        handleChangeRadio={handleChangeRadio}
        defaultQuery={{ ...getQueryParams() }}
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
                  {status === "pending"
                    ? [...Array(7)].map((_, i) => (
                        <TableRow role="checkbox" key={i}>
                          {[...Array(7)].map((_, k) => (
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
                    : status === "succeeded" &&
                      entities?.data?.data.map((row, i) => {
                        let part1 = row?.mobile?.slice(0, 4);
                        let part2 = row?.mobile?.slice(4, 7);
                        let part3 = row?.mobile?.slice(7, 9);
                        let part4 = row?.mobile?.slice(9, 11);
                        return (
                          <TableRow key={i} role="checkbox">
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={useCheckBoxSelector.items[i].checked}
                                onClick={() => handleSelect(row.id)}
                              />
                            </TableCell>
                            <TableCell
                              sx={{ cursor: "pointer" }}
                              align="left"
                              onClick={() => handleUserDetail(row.id)}
                            >
                              {row.name}
                            </TableCell>
                            <TableCell align="center">
                              {row.clients_count === 0
                                ? "-"
                                : convertDigits(row.clients_count)}
                            </TableCell>
                            <TableCell align="center">
                              {row.organization}
                            </TableCell>
                            <TableCell align="left">
                              <Grid container justifyContent={"center"}>
                                {row.bi_change === 0 ? (
                                  "-"
                                ) : row.bi_change > 0 ? (
                                  <FlashUp />
                                ) : (
                                  <FlashDown />
                                )}
                              </Grid>
                            </TableCell>
                            <TableCell align="left">
                              {convertDigits(part4)} {convertDigits(part3)}{" "}
                              {convertDigits(part2)} {convertDigits(part1)}
                            </TableCell>
                            <TableCell align="center">{row.level}</TableCell>
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
                                    handleClickConfirmation(row.id)
                                  }
                                >
                                  <TrashIcone />
                                </IconButton>
                                <IconButton
                                  aria-label="menu"
                                  onClick={() =>
                                    handleNavigate(row.id, row.organization)
                                  }
                                >
                                  <EditIcon />
                                </IconButton>
                                <IconButton
                                  aria-label="menu"
                                  onClick={(e) => handleFilterMenu(e, row.id)}
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
              action={usersList}
            />
          </Paper>
        </Box>
        <MenuItems anchorEl={anchorEl} open={open} handleClose={handleClose}>
          <Grid item>
            <MenuItem
              sx={{ justifyContent: "center" }}
              onClick={handleClickOpen}
            >
              <Typography color={"#000000"}> {t("تخصیص مشتری ")}</Typography>
            </MenuItem>
            {/* <MenuItem sx={{ justifyContent: "center" }}>
                        <Typography color={"#000000"}>
                          {t("تخصیص مشتری گروهی")}
                        </Typography>
                      </MenuItem> */}
          </Grid>
        </MenuItems>
        <DialogComponent
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          userid={userid}
        />

        <Confirmation
          statusConfirmation={openConfirmation}
          stateId={stateId}
          setOpenConfirmation={setOpenConfirmation}
          msg={"حذف مدیر ارتباط"}
          bodymsg={"آیا می خواهید مدیر ارتباط را حذف کنید؟"}
          handleExecution={handleDelete}
        />
        {/* {deleteState && <Notifier />} */}
        <Notifier />
      </Grid>
    </>
  );
};
