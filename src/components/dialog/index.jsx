import React, { useEffect, useRef, useState, useMemo } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import { CheckboxesTags } from "../../components/hook-form/RHFAutoComplete";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useTranslation } from "react-i18next";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { clientSearch } from "../../actions/clients";
import { usersAssign } from "../../actions/users";
import { debounce, isArray } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { removeParams } from "../../utils";

import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export const DialogComponent = ({ openDialog, setOpenDialog, userid }) => {
  const { t, i18n } = useTranslation();
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clientsids = useRef([]);

  const onChange = (e) => {
    clientsids.current = e;
  };

  const handleChangeSearchClient = (e) => {
    if (e.target.value !== "") {
      const params = { search: e.target.value };

      dispatch(clientSearch({ params: params }));
    } else if (e.target.value === "") {
      removeParams("search", navigate);
      dispatch(clientSearch({ params: { page: 1 } }));
    }
  };
  const debouncedResultsClients = useMemo(() => {
    return debounce(handleChangeSearchClient, 500);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResultsClients.cancel();
    };
  });

  const { statusClient, clietList, errorClient } = useSelector(
    (state) => state.clientSearchSlice
  );

  useEffect(() => {
    dispatch(clientSearch({ page: 1 }));
  }, []);

  const handleExecution = () => {
    const result = {
      user_id: userid,
      client_ids: clientsids.current.map((e) => e.id),
    };
    dispatch(usersAssign(result)).then((res) => {
      if (res.payload.status === 200) {
        handleCloseDialog();
      }
    });
  };
  return (
    <Dialog
      open={openDialog}
      // onClose={handleCloseDialog}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">
        <Grid container direction="row" justifyContent={"flex-end"}>
          <Typography color={"#000000"} align="left">
            {" "}
            {t("تخصیص مشتری")}
          </Typography>
        </Grid>
      </DialogTitle>
      <DialogContent dividers>
        <CheckboxesTags
          data={clietList?.data}
          statusClient={statusClient}
          debouncedResultsClients={debouncedResultsClients}
          onChange={onChange}
        />
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ background: "#EFF3F3", width: "70px" }}
          onClick={handleCloseDialog}
        >
          {t("cancel")}
        </Button>
        <Button
          sx={{ width: "85px" }}
          variant="contained"
          onClick={handleExecution}
        >
          {t("execution")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
