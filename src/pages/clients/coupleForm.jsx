import React from "react";
import { Grid, Stack, Box } from "@mui/material";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import {
  FormProvider,
  RHFTextField,
  RHFCheckbox,
} from "../../components/hook-form";
import { Typography } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const CreateClientCouple = () => {
  const theme = useTheme();
  const defaultValues = {
    username: "",
    password: "",
  };

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (e) => {
    console.log(e);
    // dispatch(userLogin(e))
    // navigate("/");
  };

  const { t, i18n } = useTranslation();

  const [organization, setorganization] = React.useState("");
  const [position, setposition] = React.useState("");
  const [userPosition, setUserPosition] = React.useState("");

  const handleChangeOrganization = (event) => {
    setorganization(event.target.value);
  };

  const handleChangePostion = (event) => {
    setposition(event.target.value);
  };

  const handleChangeUserPosition = (event) => {
    setUserPosition(event.target.value);
  };

  return (
    <Grid container >
      <Grid item container justifyContent={"end"} mb={4}>
        <Typography>{t("insert client")}</Typography>
      </Grid>

      <Grid item xl={12}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container dir="rtl" spacing={12}>
        
        <Grid container justifyContent={"center"} item>
          <Box
            sx={{
              width: "270px",
              height: "283px",
              background: "#F5F5F5",
              border: "1px dashed #000000",
              borderRadius: "4px",

              display: "flex",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <Typography>{t("exelFile")}</Typography>
          </Box>
        </Grid>
        <Grid container justifyContent={"center"} item>
          <LoadingButton
            size="small"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{ width: "200px" }}
          >
            {t("insert")}
          </LoadingButton>
          <Button sx={{ color: "#FF2020" }}>{t("remove")}</Button>
        </Grid>
        </Grid>

     
      </FormProvider>
      </Grid>


    </Grid>
  );
};
