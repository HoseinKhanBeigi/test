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
import MenuItem from "@mui/material/MenuItem";
import { usersList, deleteUser } from "../../actions/users";
import { TrashIcone, OptionIcone, EditIcon } from "../../components/icons";
import { getQueryParams } from "../../utils";
import { initialTabs, initialDrops } from "./filterItems";
import { Typography } from "@mui/material";
import { createSearchParams, useNavigate } from "react-router-dom";
import { responseMessage } from "../../features/messageLog";
import { HeaderPage } from "../../components/headerPage";
import { MenuItems } from "../../components/menuItems";
import { PaginationTable } from "../../components/pagination";
import { DialogComponent } from "../../components/dialog";
import { Confirmation } from "../../components/confirmation";
import { convertDigits } from "persian-helpers";
// import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userid, setUserId] = React.useState();
  const [deleteState, setDeleteState] = React.useState(false);
  const open = Boolean(anchorEl);
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
    t("طبقه ی بازاریاب"),
    "",
  ];

  const dispatch = useDispatch();
  const { status, entities, error } = useSelector(
    (state) => state.userListSlice
  );

  useEffect(() => {
    const params = { page: 1 };
    navigate({
      search: `?${createSearchParams(params)}`,
    });

    dispatch(usersList({ params: { page: 1, ...getQueryParams() } }));
  }, []);

  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const onChange = (e) => {
    // console.log(e);
  };

  const handleNavigate = (id) => {
    navigate(`/users/update/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser({ id })).then((res) => {
      if (res.payload.status === 200) {
        setDeleteState(true);
        setOpenConfirmation(false);
        dispatch(responseMessage(res.payload.message));
        dispatch(usersList({ params: { ...getQueryParams() } }));
      }
    });
  };

  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [stateId, setStateId] = useState();

  const handleClickConfirmation = (id) => {
    setOpenConfirmation(true);
    setStateId(id);
  };

  const initialReducer = useRef([]);

  const handlePushItem = (item) => {
    item.map((_, i) => {
      initialReducer.current[i] = { checked: false, id: i };
    });
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SELECTALL":
        return state.map((item) => {
          return { ...item, checked: !item.checked };
        });

      case "SELECTITEM":
        return state.map((item) => {
          if (item.id === action.payload) {
            return { ...item, checked: !item.checked };
          } else {
            return item;
          }
        });
      default:
        return state;
    }
  };

  const handleSelectAll = (item) => {
    console.log(initialReducer.current.length);
    dispatchAction({ type: "SELECTALL" });
  };

  const handleChangeSelect = (item) => {
    if (initialReducer.current.length === 0) {
      item.map((_, i) => {
        initialReducer.current.push({ checked: false, id: i });
      });
    }
  };

  const handleSelect = (i) => {
    dispatchAction({ type: "SELECTITEM", payload: i });
  };

  const [items, dispatchAction] = useReducer(reducer, initialReducer.current);

  let num = "09123979838";
  const res = num.replace(/\D/g, "").match(/(\d{4})(\d{2})(\d{2})(\d{3})/);

  const mobileMask = (number) => {
    let part1 = number.slice(0, 4);
    let part2 = number.slice(4, 6);
    let part3 = number.slice(6, 8);
    let part4 = number.slice(8, 11);
    console.log(part1, part2, part3, part4);
    return res;
  };

  return (
    <>
      <HeaderPage
        title={t("usersList")}
        action={usersList}
        entities={entities}
        status={status}
        initialTabs={initialTabs}
        initialDrops={initialDrops}
        page="table"
        tab={true}
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
                      {status === "succeeded" &&
                        handlePushItem(entities?.data?.data)}
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
                      let part1 = row?.mobile?.slice(0, 4);
                      let part2 = row?.mobile?.slice(4, 6);
                      let part3 = row?.mobile?.slice(6, 8);
                      let part4 = row?.mobile?.slice(8, 11);
                      return (
                        <TableRow key={i} role="checkbox">
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={items[i].checked}
                              onClick={() => handleSelect(i)}
                            />
                          </TableCell>
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="left">{""}</TableCell>
                          <TableCell align="left">{row.organization}</TableCell>
                          <TableCell align="left">{""}</TableCell>
                          <TableCell align="left">
                            {convertDigits(part4)} {convertDigits(part3)}{" "}
                            {convertDigits(part2)} {convertDigits(part1)}
                          </TableCell>
                          <TableCell align="left">{row.level}</TableCell>
                          <TableCell align="left">
                            <IconButton
                              aria-label="menu"
                              onClick={() => handleClickConfirmation(row.id)}
                            >
                              <TrashIcone />
                            </IconButton>
                            <IconButton
                              aria-label="menu"
                              onClick={() => handleNavigate(row.id)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              aria-label="menu"
                              onClick={(e) => handleFilterMenu(e, row.id)}
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
          onChange={onChange}
          userid={userid}
        />

        <Confirmation
          statusConfirmation={openConfirmation}
          stateId={stateId}
          setOpenConfirmation={setOpenConfirmation}
          msg={"حذف بازاریاب"}
          bodymsg={"آیا می خواهید بازاریاب را حذف کنید؟"}
          handleExecution={handleDelete}
        />
        {deleteState && <Notifier />}
      </Grid>
    </>
  );
};
