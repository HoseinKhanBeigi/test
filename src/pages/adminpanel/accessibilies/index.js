import { Button, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { Fragment, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PermissinsAction, addRmPermissions } from "../../../actions/admin";
import { getStatusOfPermissions } from "../../../features/admin/permissions";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Notifier from "../../../components/notify";
import { useDispatchAction } from "../../../hooks/useDispatchAction";
import { responseMessage } from "../../../features/messageLog";
import { useTranslation } from "react-i18next";

export const Accessiblities = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { entities, status, permissions, RM1, RM2, RM3, RM4, RM5, RM6,RM7 } =
    useSelector((state) => state.permissionsSlice);
  useDispatchAction(PermissinsAction, status);
  const options = useMemo(() => {
    const res = {
      permissions: entities?.data?.permissions,
      roles: entities?.data?.roles,
    };
    return res;
  }, [status]);


  const theme = useTheme();

  const handleChange = (value, roles, idx) => {
    dispatch(getStatusOfPermissions({ roles, value, idx }));
  };

  const handleClick = () => {
    const permissions = {
      RM1,
      RM2,
      RM3,
      RM4,
      RM5,
      RM6,
      RM7
    };
    const res = {
      permissions,
    };
    dispatch(addRmPermissions(res)).then((result) => {
      if (result.payload.status === 200) {
        dispatch(responseMessage(result.payload.message));
        dispatch(PermissinsAction({}))
      }
    })
  };

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        dir="rtl"
        rowGap={2}
      >
        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={10}>
            <Grid container justifyContent={"space-between"}>
              {options?.roles &&
                Object.entries(options?.roles).map(([key, value], idx) => {
                  return (
                    <Typography color={theme.palette.primary.main} key={idx}>
                      {key}
                    </Typography>
                  );
                })}
            </Grid>
          </Grid>
        </Grid>
        {permissions?.map((e, i) => (
          <Fragment key={i}>
            <Grid item xs={2}>
              <Typography>{e.label}</Typography>
            </Grid>
            <Grid item xs={10}>
              <Grid container justifyContent={"space-between"}>
                {e?.roles?.map((value, idx) => {
                  return (
                    <FormControlLabel
                      key={idx}
                      control={
                        <Switch
                          checked={value.status}
                          onChange={() => handleChange(value, e, idx)}
                        />
                      }
                      sx={{ marginRight: 0 }}
                    />
                  );
                })}
              </Grid>
            </Grid>
          </Fragment>
        ))}
      </Grid>
      <Grid container justifyContent={"start"} mt={2}>
        <Button variant="contained" onClick={handleClick}>
          {t("entry")}
        </Button>
      </Grid>
      <Notifier />
    </>
  );
};
