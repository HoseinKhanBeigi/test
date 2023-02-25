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

// components
import Iconify from "../../components/iconify";
import { LoginIcon, Karafaring, LogoKarafarin } from "../../components/icons";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import passwordImg from "../newPassword/password.png";
import {
  FormProvider,
  RHFTextField,
  RHFCheckbox,
} from "../../components/hook-form";

import { responseMessage } from "../../features/messageLog";
import { changePassword } from "../../actions/users";

// ----------------------------------------------------------------------

export default function ChangePassword() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const LoginSchema = Yup.object().shape({
    password_confirmation: Yup.string().required(
      "password_confirmation is required"
    ),
    password: Yup.string().required("Password is required"),
    current_password: Yup.string().min(8,t("current_password must be at least 8 characters")).required(t("password must be 8 character")),
  });

  const defaultValues = {
    password_confirmation: "",
    password: "",
    current_password: "",
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
    console.log(e);
    
    dispatch(changePassword(e)).then((res) => {
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
          <Grid item mb={3}>
            <img src={passwordImg} />
          </Grid>

          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container mb={5} justifyContent="start">
              <Typography color={"#3B3B3B"} mb={2}></Typography>
              <RHFTextField
                name="current_password"
                label={t("رمز فعلی ")}
                placeholder={t("رمز فعلی ")}
                typeFrom="login"
                InputProps={{}}
              />
            </Grid>
            <Grid container mb={5} justifyContent="start">
              <RHFTextField
              
                typeFrom="login"
                name="password"
                style={{ textAlign: "center" , width:"400px" }}
                label={t("newpassword")}
                placeholder={t("newpassword")}
                type={showPassword ? "text" : "password"}
                // InputProps={{
                //   endAdornment: (
                //     <InputAdornment position="end">
                //       <IconButton
                //         onClick={() => setShowPassword(!showPassword)}
                //         edge="end"
                //       >
                //         {/* <Iconify
                //         icon={
                //           showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                //         }
                //       /> */}
                //         {showPassword ? (
                //           <VisibilityIcon />
                //         ) : (
                //           <VisibilityOffIcon />
                //         )}
                //       </IconButton>
                //     </InputAdornment>
                //   ),
                // }}
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
                // InputProps={{
                //   endAdornment: (
                //     <InputAdornment position="end">
                //       <IconButton
                //         onClick={() => setShowPassword(!showPassword)}
                //         edge="end"
                //       >
                //         {/* <Iconify
                //         icon={
                //           showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                //         }
                //       /> */}
                //         {showPassword ? (
                //           <VisibilityIcon />
                //         ) : (
                //           <VisibilityOffIcon />
                //         )}
                //       </IconButton>
                //     </InputAdornment>
                //   ),
                // }}
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
