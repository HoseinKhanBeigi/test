import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userLogin } from "../../actions/login";
import { NavLink, Outlet } from "react-router-dom";
import Notifier from "../../components/notify";
import { resetPasswordAction } from "../../actions/newPassword";

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
import passwordImg from "./password.png";
import {
  FormProvider,
  RHFTextField,
  RHFCheckbox,
} from "../../components/hook-form";

import password from "./password.png";
import { responseMessage } from "../../features/messageLog";

// ----------------------------------------------------------------------

export default function NewPassword() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const LoginSchema = Yup.object().shape({
    password_confirmation: Yup.string().required("Password is required"),
    password: Yup.string().required("Password is required"),
    username: Yup.string().required("Email is required"),
  });

  const defaultValues = {
    password_confirmation: "",
    password: "",
    username: "",
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
    const res = {
      token: params?.id,
      ...e,
    };

    dispatch(resetPasswordAction(res)).then((res) => {
      setLoading(true);
      if (res.payload.status === 200) {
        setLoading(false);
        navigate("/login");

        dispatch(responseMessage(res.payload.message));
      }
    });
  };

  const handletoForgot = () => {
    navigate("/login");
  };

  return (
    <>
      <Grid
        container
        justifyContent={"center"}
        alignItems="center"
        dir="rtl"
        sx={{
          height: "100%",
        }}
      >
        <Notifier />
        <Grid item container alignItems="center" flexDirection="column">
          <Grid item>
            <Typography>{"فراموشی رمز عبور"}</Typography>
          </Grid>
          <Grid item mb={3}>
            <img src={passwordImg} />
          </Grid>
          <Grid item mb={5}>
            <Typography>{"لطفا رمز جدید خود را وارد کنید."}</Typography>
          </Grid>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container mb={5} justifyContent="start">
              <Typography color={"#3B3B3B"} mb={2}></Typography>
              <RHFTextField
                name="username"
                label={t("username")}
                placeholder={t("username")}
                typeFrom="login"
                InputProps={{}}
              />
            </Grid>
            <Grid container mb={5} justifyContent="start">
              <RHFTextField
                typeFrom="login"
                name="password"
                style={{ textAlign: "center" }}
                label={t("newpassword")}
                placeholder={t("newpassword")}
                type={showPassword ? "text" : "password"}
                InputProps={{
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

            <Grid container mb={5} justifyContent="start">
              <RHFTextField
                typeFrom="login"
                name="password_confirmation"
                style={{ textAlign: "center" }}
                label={t("password_confirmation")}
                placeholder={t("password_confirmation")}
                type={showPassword ? "text" : "password"}
                InputProps={{
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

            <Grid container>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={loading}
              >
                {t("ثبت")}
              </LoadingButton>
            </Grid>
            <Grid container justifyContent={"center"}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ my: 2 }}
              >
                {/* <RHFCheckbox name="remember" label="Remember me" /> */}
                <Link
                  variant="subtitle2"
                  underline="hover"
                  to={"/forgetpassword"}
                  onClick={handletoForgot}
                >
                  {t("backtoLoginPage")}
                </Link>
              </Stack>
            </Grid>
          </FormProvider>
        </Grid>
      </Grid>
    </>
  );
}
