import { Box, Button, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  permissionsUser,
  addUserPermission,
  UserManagerAction,
} from "../../../../actions/admin";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { changePermissionStatus } from "../../../../features/admin/userManager/permissions";

export const UserPermissions = () => {
  const { t } = useTranslation();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, permissions, permissionList } = useSelector(
    (state) => state.permissionUserSlice
  );
  useEffect(() => {
    if (status === "idle") {
      dispatch(
        permissionsUser({
          user_id: params.id,
        })
      );
    }
  }, [status, dispatch]);

  const handleChange = (e) => {
    dispatch(changePermissionStatus({ id: e.id }));
  };

  const handleClick = () => {
    const result = {
      user_id: params.id,
      permissions: permissionList.map((e) => e.id),
    };
    dispatch(addUserPermission(result)).then(() => {
      dispatch(UserManagerAction({}));
      navigate("/admin/userManager");
    });
  };

  return (
    <>
      <Grid container justifyContent={"center"} rowGap={2}>
        <Box>
          {permissions?.map((e, i) => (
            <Grid
              key={i}
              container
              justifyContent="space-between"
              alignItems="center"
              dir="rtl"
            >
              <Grid container item xs={6} justifyContent="start">
                <Typography>{e.label}</Typography>
              </Grid>
              <Grid container item xs={6} justifyContent="end">
                <FormControlLabel
                  control={
                    <Switch
                      checked={e.status}
                      onChange={() => handleChange(e)}
                    />
                  }
                  sx={{ marginRight: 0 }}
                />
              </Grid>
            </Grid>
          ))}
          <Grid container justifyContent={"center"} mt={2}>
            <Button fullWidth variant="contained" onClick={handleClick}>
              {t("entry")}
            </Button>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};
