import * as React from "react";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
import { useForm } from "react-hook-form";

import { FormProvider, RHFTextField, RHAuto } from "../../components/hook-form";
import DialogTitle from "@mui/material/DialogTitle";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { Grid, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";
import { useDispatchAction } from "../../hooks/useDispatchAction";

import { useSelector, useDispatch } from "react-redux";
import { clientsNote } from "../../actions/notes";
export const NoteForm = ({ open, title, setOpen }) => {
  const { t, i18n } = useTranslation();
  const NoteSchema = Yup.object().shape({});
  const dispatch = useDispatch();
  const { status, entities } = useSelector((state) => state.clientNoteSlice);
  useDispatchAction(clientsNote, status, "option");
  const defaultValues = {
    title: "",
    client_id: "",
  };
  const methods = useForm({
    resolver: yupResolver(NoteSchema),
    defaultValues,
  });

  const onSubmit = (e) => {};
  const handleChangeClientId = (event) => {
    methods.setValue("client_id", event.id);
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleCancel = () => {
    setOpen(false);
    // if (!edit) {
    //   resetForm();
    // }
  };
  return (
    <Dialog
      open={open}
      // onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container justifyContent={"end"} mb={2}>
            <Typography color={"#3B3B3B"} mb={1}>
              {t("clientName")}
            </Typography>
            <RHAuto
              name="client_id"
              label={t("typeOfInstructure")}
              placeholder={t("typeOfInstructure")}
              typeFrom="create"
              value={entities?.data ?? []}
              defaultValue={[]}
              multiple={false}
              handleChange={handleChangeClientId}
              loadingCreate={status === "succeeded"}
              loadingEdit={status === "succeeded"}
              propTitle={"name"}
              propValue={"id"}
            />
          </Grid>
          <Grid container justifyContent={"end"} mb={2}>
            <Typography color={"#3B3B3B"} mb={1}>
              {t("subject")}
            </Typography>
            <RHFTextField
            
              name="title"
              label={t("insertNote")}
              placeholder={t("insertNote")}
              typeFrom="login"
              rows={5}
              multiline
            />
          </Grid>

          <Grid container>
            <LoadingButton
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {t("create")}
            </LoadingButton>
            <Button onClick={handleCancel} color={"error"}>
              {t("cancel")}
            </Button>
          </Grid>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
