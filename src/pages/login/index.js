import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userLogin } from "../../actions/userAction";
import { NavLink, Outlet } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../components/iconify";
import { LoginIcon, Karafaring } from "../../components/icons";
import {
  FormProvider,
  RHFTextField,
  RHFCheckbox,
} from "../../components/hook-form";

// ----------------------------------------------------------------------

export default function Login() {
  const { loading, userInfo, error } = useSelector((state) => state.user)

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

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (e) => {
    dispatch(userLogin(e));
  };

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems="center"
      sx={{
        background:
          "linear-gradient(228.91deg, #5041BC 15.38%, #017874 89.32%)",
      }}
    >
      <Card sx={{ padding: "24px" }}>
        <Grid item container alignItems="center" mb={2} flexDirection="column">
          <Grid item>
            <LoginIcon stroke={"#017874"} />
          </Grid>
          <Grid item>
            <Karafaring />
          </Grid>
          <Grid item>
            <Typography>
              {"به سامانه ی بازاریابی بانک کارآفرین خوش آمدید"}
            </Typography>
          </Grid>
        </Grid>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <RHFTextField name="username" label="username" />

            <RHFTextField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      <Iconify
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          >
            {/* <RHFCheckbox name="remember" label="Remember me" /> */}
            <Link variant="subtitle2" underline="hover">
              Forgot password?
            </Link>
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Login
          </LoadingButton>
        </FormProvider>
      </Card>
    </Grid>
  );
}
