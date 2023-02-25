import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  Grid,
  Card,
  Typography,
} from "@mui/material";
import {
  LoginIcon,
  Karafaring,
  LogoKarafarin,
  TotalyHappy,
  HappyFace,
  SilenceFace,
  SadFace,
  TotalySad,
} from "../../components/icons";
import feed from "./feed.png";
export const FeedBack = () => {
  return (
    <Grid
      container
      flexDirection={"column"}
      alignItems="center"
      justifyContent={"center"}
      sx={{ height: "100%" }}
    >
      <Grid item>
        <LoginIcon stroke={"#017874"} />
      </Grid>
      <Grid item>
        <Karafaring />
      </Grid>
      <Grid item mb={4}>
        <LogoKarafarin />
      </Grid>
      <Grid item mb={2}>
        <img src={feed} />
      </Grid>
      <Grid item mb={2}>
        <Typography>{"سلام همراه گرامی"}</Typography>
      </Grid>
      <Grid item>
        <Typography>
          {
            "ارزیابی شما از  خدمات ارایه شده توسط همکار بانک تخصیص یافته به جنابعالی چیست؟"
          }
        </Typography>
      </Grid>
      <Grid container item>
        <TotalyHappy />
        <HappyFace />
        <SilenceFace />
        <SadFace />
        <TotalySad />
      </Grid>
    </Grid>
  );
};
