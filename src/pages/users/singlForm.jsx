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
import Button from '@mui/material/Button';
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

export const CreateUserSingle = () => {
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
    <Grid container>
      <Grid item container justifyContent={"end"} mb={4}>
        <Typography>{t("insert user")}</Typography>
      </Grid>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={14} dir="rtl">
          <Grid item xl={6} md={6} sm={6}>
            <Typography>{t("fullName")}</Typography>
            <RHFTextField name="name" label={t("fullName")} />
          </Grid>
          <Grid item xl={6} md={6} sm={6}>
            <Typography>{t("phoneNumber")}</Typography>
            <RHFTextField
              name="mobile"
              label={t("phoneNumber")}
              type="number"
            />
          </Grid>
          <Grid item xl={6} md={6} sm={6}>
            <Typography>{t("email")}</Typography>
            <RHFTextField name="email" label={t("email")} />
          </Grid>

          <Grid item xl={6} md={6} sm={6}>
            <Typography>{t("partOfOrganization")}</Typography>
            <FormControl fullWidth sm={6}>
              <InputLabel id="demo-simple-select-fullWidth-label">
                {t("partOfOrganization")}
              </InputLabel>
              <Select
                labelId="demo-simple-select-fullWidth-label"
                id="demo-simple-select-fullWidth-label"
                fullWidth
                value={organization}
                label={t("partOfOrganization")}
                onChange={handleChangeOrganization}
              >
                {["شعبه", "ستاد", "شرکت های فرعی", "نمایندگان", "سایر"].map(
                  (e, i) => (
                    <MenuItem value={e} key={i}>
                      {e}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xl={6} md={6} sm={6}>
            <Typography>{t("personality code")}</Typography>
            <RHFTextField name="personnel_code" label={t("personality code")} />
          </Grid>
          <Grid item xl={6} md={6} sm={6}>
            <Typography>{t("position")}</Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-fullWidth-label">
                {t("position")}
              </InputLabel>
              <Select
                labelId="demo-simple-select-fullWidth-label"
                id="demo-simple-select-fullWidth-label"
                fullWidth
                value={position}
                label={t("position")}
                onChange={handleChangePostion}
              >
                {[
                  "عضو هیات مدیره",
                  "مدیرعامل",
                  "معاون مدیرعامل",
                  "مدیر امور تجاری-شخصی",
                  "مدیر امور شرکتی",
                  "مدیر امور سرمایه گذاری",
                  "رییس منطقه",
                  "رییس شعبه",
                  "معاون ریالی شعبه",
                  "معاون ارزی شعبه",
                  "رییس اداره",
                  "کارشناس ستاد",
                  "کارشناس شعبه",
                  "شرکت های فرعی",
                  "سایر نمایندگان",
                ].map((e, i) => (
                  <MenuItem key={i} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xl={6} md={6} sm={6}>
            <Typography>{t("userPosition")}</Typography>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-fullWidth-label">
                {t("userPosition")}
              </InputLabel>
              <Select
                labelId="demo-simple-select-fullWidth-label"
                id="demo-simple-select-fullWidth"
                value={userPosition}
                onChange={handleChangeUserPosition}
                fullWidth
                label={t("userPosition")}
              >
                {["RM5", "RM6", "RM7", "RM4", "RM3", "RM2", "RM1"].map(
                  (e, i) => (
                    <MenuItem key={i} value={e}>
                      {e}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xl={6} md={6} sm={6}>
            <Typography>{t("directSeniorUser")}</Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-fullWidth-label">
                {t("directSeniorUser")}
              </InputLabel>

              <Select
                labelId="demo-simple-select-fullWidth-label"
                id="demo-simple-select-fullWidth-label"
                fullWidth
                // value={age}
                label={t("directSeniorUser")}
                // onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid container justifyContent={"end"} item>
          <LoadingButton
              size="small"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{width:"200px"}}
            >
              {t("insert")}
            </LoadingButton>
            <Button sx={{color:"#FF2020"}}>{t("remove")}</Button>
          </Grid>
        </Grid>
      </FormProvider>
    </Grid>
  );
};
