import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { styled, theme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { useDispatch, useSelector } from "react-redux";

import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box, FormControlLabel, Grid, Switch } from "@mui/material";
import { changeColor } from "../../features/mutiColors";
import {
  ContextIcon,
  LanguageIcon,
  MultiColors,
  NotifyIconProile,
} from "../icons";
import { t } from "i18next";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const ProfileDialog = ({ handleClose, open }) => {
  const dispatch = useDispatch();
  const { colors } = useSelector((state) => state.MutiColors);

  const handleClick = (e) => {
    dispatch(changeColor({ name: e.name }));
  };
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <Dialog id="customized-dialog-title" onClose={handleClose}>
        Modal title
      </Dialog>
      <DialogContent
        dividers
        sx={{
          width: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <Grid container dir="rtl">
          <Grid
            container
            item
            xs={6}
            justifyContent={"space-around"}
            alignItems="center"
          >
            <NotifyIconProile />
            <Typography>{t("notification")}</Typography>
          </Grid>
          <Grid container item xs={6} justifyContent="flex-end">
            <FormControlLabel control={<Switch defaultChecked />} />
          </Grid>
        </Grid>

        <Grid container dir="rtl">
          <Grid
            container
            item
            xs={6}
            justifyContent={"space-around"}
            alignItems="center"
          >
            <LanguageIcon />
            <Typography>{t("language")}</Typography>
          </Grid>
          <Grid container item xs={6} justifyContent="flex-start">
            <Button variant="outlined">{t("farsi")}</Button>
          </Grid>
        </Grid>
        <Grid container dir="rtl">
          <Grid
            container
            item
            xs={6}
            justifyContent={"space-around"}
            alignItems="center"
          >
            <ContextIcon />
            <Typography>{t("context")}</Typography>
          </Grid>
          <Grid container item xs={6} justifyContent="flex-start">
            <Button variant="outlined">{t("light")}</Button>
            <Button variant="outlined" disabled>
              {t("dark")}
            </Button>
          </Grid>
        </Grid>
        <Grid container dir="rtl">
          <Grid
            container
            item
            xs={6}
            justifyContent={"space-around"}
            alignItems="center"
          >
            <MultiColors />
            <Typography>{t("main color")}</Typography>
          </Grid>
          <Grid container item xs={6} justifyContent="space-around">
            {colors.map((e) => (
              <Box
                onClick={() => handleClick(e)}
                sx={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "16px",
                  background: e.background,
                  cursor: "pointer",
                }}
              />
            ))}
          </Grid>
        </Grid>
      </DialogContent>
      {/* <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Save changes
        </Button>
      </DialogActions> */}
    </BootstrapDialog>
  );
};
