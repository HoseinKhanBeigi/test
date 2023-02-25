import * as Yup from "yup";
import React, { useState, Suspense } from "react";
import { useNavigate } from "react-router-dom";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userLogin } from "../../actions/login";

import Notifier from "../../components/notify";
import { dashboardApp } from "../../actions/profile";

// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  Grid,
  Card,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { LoadingButton } from "@mui/lab";
import "./login.css";
// components
import { LoginIcon, Karafaring, LogoKarafarin } from "../../components/icons";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { FormProvider, RHFTextField } from "../../components/hook-form";
import { LoginLayout, CardLogin } from "../../components/details";
const Image = React.lazy(async () => await import("../../components/image"));

// ----------------------------------------------------------------------

export default function Login() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    username: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (e) => {
    dispatch(userLogin(e)).then((res) => {
      if (res.payload.status === 200) {
        navigate("/home");
        dispatch(dashboardApp({}));
      }
    });
  };

  const handletoForgot = () => {
    navigate("/forgetpassword");
  };

  return (
    <LoginLayout
      container
      justifyContent={"center"}
      alignItems="center"
      dir="rtl"
    >
      <Image src={"backgroundLayout"} className="imglogin" />

      <CardLogin>
        <Notifier />
        <Grid item container alignItems="center" mb={8} flexDirection="column">
          <Grid item>
            <LoginIcon stroke={"#017874"} />
          </Grid>
          <Grid item>
            <Karafaring />
          </Grid>
          <Grid item>
            <LogoKarafarin />
          </Grid>
          <Grid item mt={4}>
            <Typography>{t("loginpageTitle")}</Typography>
          </Grid>
        </Grid>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container mb={5} justifyContent="start">
            <Typography color={"#3B3B3B"} mb={2}></Typography>
            <RHFTextField
              name="username"
              label={t("username")}
              placeholder={t("username")}
              typeFrom="login"
            />
          </Grid>

          <Grid container mb={5} justifyContent="start">
            <RHFTextField
              typeFrom="login"
              name="password"
              style={{ textAlign: "center" }}
              label={t("password")}
              placeholder={t("password")}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid container mb={5}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <Link
                variant="subtitle2"
                underline="hover"
                to={"/forgetpassword"}
                onClick={handletoForgot}
              >
                {t("Forgot_password")}
              </Link>
            </Stack>
          </Grid>
          <Grid container>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {t("login")}
            </LoadingButton>
          </Grid>
        </FormProvider>
      </CardLogin>
    </LoginLayout>
  );
}
