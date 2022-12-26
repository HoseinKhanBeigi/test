import { Grid } from "@mui/material";

import { Box, Card, Link, Typography } from "@mui/material";
import { ArrowVector } from "../icons";

export const ClientCard = ({
  type,
  national_identifier,
  name,
  totalPoint,
  biPoint,
}) => {
  return (
    <Card sx={{ width: "250px", height: "155px", padding: "16px" }}>
      <Grid container justifyContent={"space-between"} mb={3}>
        <Typography>{national_identifier}</Typography>
        <Typography
          color={"#fff"}
          sx={{
            borderRadius: "24px",
            background: type !== "حقوقی" ? "#2563EB" : "#5041BC",
            padding: "4px",
          }}
          fontSize={12}
        >
          {type}
        </Typography>
      </Grid>
      <Grid container justifyContent={"center"} mb={3}>
        <Typography color={"#017874"} fontSize={12}>
          {name}
        </Typography>
      </Grid>
      <Grid container justifyContent={"space-between"}>
        <Grid item>
          <Grid
            container
            justifyContent={"space-between"}
            item
            alignItems={"center"}
            sx={{ width: "40px" }}
          >
            <ArrowVector />
            <Typography fontSize={14}>{"A+"}</Typography>
          </Grid>
        </Grid>
        <Typography color={"#3B3B3B"} fontSize={12}>
          {`رتبه کل: ${totalPoint}`}
        </Typography>
      </Grid>
    </Card>
  );
};
