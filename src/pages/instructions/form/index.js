import * as React from "react";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useForm } from "react-hook-form";
import Notifier from "../../../components/notify";
import { responseMessage } from "../../../features/messageLog";
import {
  FormProvider,
  RHFTextField,
  RHSelectField,
  RHFCheckbox,
  RHAuto,
} from "../../../components/hook-form";
import DialogTitle from "@mui/material/DialogTitle";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { Grid, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";
import { useDispatchAction } from "../../../hooks/useDispatchAction";
import {
  InstructionCategoriesAction,
  InstructionAdminCreate,
  InstructionAdminUpdate,
  InstructionsAdmin
} from "../../../actions/admin";
import { useSelector, useDispatch } from "react-redux";

const UploaderBox = styled(Grid)(({ theme, checked }) => ({
  border: "2px dashed rgb(76, 76, 76)",
  height: "265px",
  width: "283px",
  borderRadius: "5px",
}));

export const FormIntruction = ({ open, setOpen, title, edit, init }) => {
  const instructionSchema = Yup.object().shape({});
  const { t, i18n } = useTranslation();
  const inputRef = React.useRef(null);
  const dispatch = useDispatch();
  const [textContent, setTextContent] = React.useState(t("uploadFile"));
  const { instructionCategories, statusCategories } = useSelector(
    (state) => state.InstructionCategoriesSlice
  );

  useDispatchAction(InstructionCategoriesAction, statusCategories, "option");
  const defaultValues = {
    name: init?.name,
    category_id: init?.category_id,
  };

  const methods = useForm({
    resolver: yupResolver(instructionSchema),
    defaultValues,
  });

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleClickInput = (e) => {
    const attach = e.target.files[0];
    setTextContent(attach.name);
    methods.setValue("file", attach);
  };

  const handleChangeCategory = (event) => {
    methods.setValue("category_id", event.id);
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const resetForm = () => {
    const defaultValues = {
      name: "",
      category_id: "",
    };
    inputRef.current.value = "";
    methods.reset({ ...defaultValues });
  };

  React.useEffect(() => {
    if (edit) {
      const defaultValues = {
        name: init?.name,
        category_id: init?.category_id,
      };
      // inputRef.current.value = "";
      methods.reset({ ...defaultValues });
    }
  }, [edit, init?.name]);

  const onSubmit = (e) => {
    if (!edit) {
      dispatch(InstructionAdminCreate(e)).then((res) => {
        if (res.payload.status === 200) {
          dispatch(responseMessage(res.payload.message));
          setTextContent(t("uploadFile"));
          setOpen(false);
          resetForm();
        }
      });
    } else {
      const res = e;
      dispatch(InstructionAdminUpdate({ id: init.id, res })).then((res) => {
        if (res.payload.status === 200) {
          dispatch(responseMessage(res.payload.message));
          setTextContent(t("uploadFile"));
          dispatch(InstructionsAdmin({}))
          setOpen(false);
          resetForm();
        }
      });
    }
  };

  const handleCancel = () => {
    setTextContent(t("uploadFile"));
    setOpen(false);
    if (!edit) {
      resetForm();
    }
  };
  return (
    <>
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
                {t("subject")}
              </Typography>
              <RHFTextField
                name="name"
                label={t("subject")}
                placeholder={t("subject")}
                typeFrom="login"
              />
            </Grid>
            <Grid container justifyContent={"end"} mb={2}>
              <Typography color={"#3B3B3B"} mb={1}>
                {t("typeOfInstructure")}
              </Typography>
              <RHAuto
                name="category_id"
                label={t("typeOfInstructure")}
                placeholder={t("typeOfInstructure")}
                typeFrom="create"
                value={instructionCategories ?? []}
                defaultValue={[]}
                multiple={false}
                handleChange={handleChangeCategory}
                loadingCreate={statusCategories === "succeeded"}
                loadingEdit={statusCategories === "succeeded"}
                propTitle={"title"}
                propValue={"id"}
              />
            </Grid>
            <Grid
              container
              alignItems="center"
              justifyContent={"center"}
              mb={2}
            >
              {!edit && (
                <UploaderBox
                  container
                  onClick={handleClick}
                  alignItems="center"
                  justifyContent={"center"}
                >
                  <Typography align="center">{textContent}</Typography>
                  <input
                    name="file"
                    hidden
                    ref={inputRef}
                    type="file"
                    onChange={handleClickInput}
                  />
                </UploaderBox>
              )}
            </Grid>
            <Grid container>
              <LoadingButton
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {!edit ? t("create") : t("update")}
              </LoadingButton>
              <Button onClick={handleCancel} color={"error"}>
                {t("cancel")}
              </Button>
            </Grid>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
};
