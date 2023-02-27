import { Grid, Typography, Button, Card } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { LoginIcon, Karafaring, LogoKarafarin } from "../icons";

export const LoginLayout = styled(Grid)(({ theme, dropDown }) => ({
  background:
    "linear-gradient(242.73deg, rgba(154, 65, 188, 0.55) 5.53%, rgba(1, 120, 116, 0.55) 95.02%);",
  height: "100vh",
  minHeight: "660px",
}));

export const LoginCard = styled(Grid)(({ theme, dropDown }) => ({
  padding: "24px",
  backgroundColor: "rgb(255 255 255 / 60%)",
  maxWidth: " 532px",
  width: "100%",
  height: "660px",
  zIndex: 999,
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
}));

export const HeaderCard = () => {
  return (
    <>
      <Grid item>
        <LoginIcon stroke={"#017874"} />
      </Grid>
      <Grid item>
        <Karafaring />
      </Grid>
      <Grid item>
        <LogoKarafarin />
      </Grid>
    </>
  );
};
