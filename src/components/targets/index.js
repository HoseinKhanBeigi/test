import { Grid } from "@mui/material";
import { Box } from "@mui/system";

export const Targets = ({top}) => {
  return (
    <Grid container dir="rtl" alignItems={"center"} sx={{position:"absolute",top:top}} mb={2} >
      <Grid item xs={5} container justifyContent={"space-evenly"}>
        <Grid item>
        <Box
          sx={{
            width: "24px",
            height: "24px",
            background: "#DB2777",
            borderRadius: "14px",
          }}
        ></Box>
        </Grid>
        <Grid item>اضافه کردن مشتری (5 عدد)</Grid>
      </Grid>
      <Grid container item xs={7} justifyContent="end">
        <Box
          sx={{
            width: "100%",
            maxWidth:"480px",
            height: "10px",
            background: "rgba(0, 0, 0, 0.12)",
            borderRadius: "28px",
            position: "relative",
          }}
        >
          <Box
            sx={{
                width: "100%",
                maxWidth:"80%",
              height: "10px",
              background: "#F7541E",
              borderRadius: "28px",
              position: "absolute",
            }}
          ></Box>
        </Box>
      </Grid>
    </Grid>
  );
};
