import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import { Typography } from "@mui/material";
import { IconConfirmation } from "../icons";

export const Confirmation = ({
  stateId,
  statusConfirmation,
  setOpenConfirmation,
  msg,
  bodymsg,
  handleExecution,
}) => {
  const { t, i18n } = useTranslation();
  const handleCloseDialog = () => {
    setOpenConfirmation(false);
  };
  return (
    <Dialog
      open={statusConfirmation}
      // onClose={handleCloseDialog}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">
        <Grid container direction="row" justifyContent={"center"} mb={4}>
          <IconConfirmation />
        </Grid>
        <Grid container direction="row" justifyContent={"center"} mb={2}>
          <Typography color={"#FF2020"}>{msg}</Typography>
        </Grid>
        <Grid container direction="row" justifyContent={"end"}>
          <Typography>{bodymsg}</Typography>
        </Grid>
      </DialogTitle>

      <DialogActions>
        <Grid container direction="row" justifyContent={"space-around"} mb={2}>
          <Button
            color="no_btn"
            sx={{ width: "85px", color: "#000" }}
            variant="contained"
            onClick={handleCloseDialog}
          >
            {t("not")}
          </Button>
          <Button
            color="yes_btn"
            variant="contained"
            sx={{
              width: "85px",
              color: "#fff",
              fontWeight: 100,
            }}
            onClick={() => handleExecution(stateId)}
          >
            {t("yes")}
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};
