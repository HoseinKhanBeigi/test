import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userLogin } from "../../actions/login";
import { NavLink, Outlet } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import "./login.css";
// components
import Iconify from "../../components/iconify";
import { LoginIcon, Karafaring, LogoKarafarin } from "../../components/icons";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  FormProvider,
  RHFTextField,
  RHFCheckbox,
} from "../../components/hook-form";

import backG3 from "./backG3.png";

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

  return (
    <>
      <Grid
        container
        justifyContent={"center"}
        alignItems="center"
        dir="rtl"
        sx={{
          background:
            " linear-gradient(242.73deg, rgba(154, 65, 188, 0.55) 5.53%, rgba(1, 120, 116, 0.55) 95.02%);",
          // backgroundImage:`url(${backG})`,
          // backgroundRepeat: "no-repeat",
          // backgroundSize: "cover",
          // height:'auto',
          height: "100%",
        }}
      >
        <img src={backG3} className="imglogin" />
        <Card
          sx={{
            padding: "24px",
            backgroundColor: "rgb(255 255 255 / 60%)",
            width: " 532px",
            height: "742px",
          }}
        >
          <Notifier />
          <Grid
            item
            container
            alignItems="center"
            mb={8}
            flexDirection="column"
          >
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
              <Typography>
                {"به سامانه بازاریابی بانک کارآفرین خوش آمدید"}
              </Typography>
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
                InputProps={{
                  sx: {
                    "& input": {
                      textAlign: "center",
                    },
                  },
                }}
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
                  sx: {
                    "& input": {
                      textAlign: "center",
                    },
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {/* <Iconify
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      /> */}
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
                {/* <RHFCheckbox name="remember" label="Remember me" /> */}
                <Link variant="subtitle2" underline="hover">
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
        </Card>
      </Grid>
    </>
  );
}
