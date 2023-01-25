import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { Fragment, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { PermissinsAction } from "../../../actions/admin";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useDispatchAction } from "../../../hooks/useDispatchAction";
import { useTranslation } from "react-i18next";

export const Accessiblities = () => {
  const { t } = useTranslation();
  const { entities, status } = useSelector((state) => state.permissionsSlice);
  useDispatchAction(PermissinsAction, status);
  const options = useMemo(() => {
    const res = {
      permissions: entities?.data?.permissions,
      roles: entities?.data?.roles,
    };
    return res;
  }, [status]);

  const theme = useTheme();

  return (
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
            {options?.roles && Object.entries(options?.roles).map(([key, value], idx) => {
              return (
                <Typography color={theme.palette.primary.main} key={idx}>
                  {key}
                </Typography>
              )
            })}
          </Grid>
        </Grid>
      </Grid>
      {options?.permissions?.map((e, i) => (
        <Fragment key={i}>
          <Grid item xs={2}>
            <Typography>{e.label}</Typography>
          </Grid>
          <Grid item xs={10}>
            <Grid container justifyContent={"space-between"}>
              {Object.entries(options?.roles).map(([key, value], idx) => {
                return (
                  <FormControlLabel
                    key={idx}
                    control={<Switch checked={value.includes(e.id)} />}
                    sx={{ marginRight: 0 }}
                  />
                )
              })}
            </Grid>
          </Grid>
        </Fragment>
      ))}
    </Grid>
  );
};
