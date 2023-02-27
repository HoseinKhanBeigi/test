import * as Yup from "yup";
import React, { useState, Suspense } from "react";
import { useNavigate } from "react-router-dom";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userLogin } from "../../actions/login";
import { NavLink, Outlet } from "react-router-dom";
import Notifier from "../../components/notify";
import { sendLinkAction } from "../../actions/forgetpass";

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
import { responseMessage } from "../../features/messageLog";
import { LoginCard, LoginLayout } from "../../components/details";
const Image = React.lazy(async () => await import("../../components/image"));

// ----------------------------------------------------------------------

export default function ForgotPass() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Email is required"),
    // password: Yup.string().required("Password is required"),
  });

  const [loading, setLoading] = useState(false);

  const defaultValues = {
    username: "",
    // password: "",
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
    setLoading(true);
    dispatch(sendLinkAction(e)).then((res) => {
      if (res.payload.status === 200) {
        setLoading(false);
        dispatch(responseMessage(res.payload.message));
      }
    });
  };

  const handleTologin = () => {
    navigate("/login");
  };

  return (
    <>
      <LoginLayout
        container
        justifyContent={"center"}
        alignItems="center"
        dir="rtl"
      >
       <Image src={"backgroundLayout"} />
        <LoginCard>
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
                {"در صورت فراموشی رمز عبور نام کاربری خود را وارد کنید!"}
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

            <Grid container>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={loading}
              >
                {t("sendlink")}
              </LoadingButton>
            </Grid>
            <Grid container mt={5} justifyContent="center">
              <Stack direction="row" alignItems="center" sx={{ my: 2 }}>
                {/* <RHFCheckbox name="remember" label="Remember me" /> */}
                <Link
                  variant="subtitle2"
                  underline="hover"
                  onClick={handleTologin}
                >
                  {t("backtoLoginPage")}
                </Link>
              </Stack>
            </Grid>
          </FormProvider>
        </LoginCard>
      </LoginLayout>
    </>
  );
}
