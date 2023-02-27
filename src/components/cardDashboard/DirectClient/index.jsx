import * as React from "react";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import { Card } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { ClientIcone } from "../../../components/icons";
import { Typography } from "@mui/material";
export const DirectClients = ({ count, percent, status }) => {
  const { t } = useTranslation();
  const option = React.useMemo(() => {
    const res = {
      percent,
      count,
    };
    return res;
  }, [status]);

  return (
    <Card sx={{ padding: "16px", height: "100%" }}>
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Grid container mt={3} justifyContent={"center"}>
          <IconButton>
            <ClientIcone />
          </IconButton>
        </Grid>
        <Grid container justifyContent={"center"} mt={2} mb={1}>
          <Typography fontSize={12} align="center">
            {t("numberOfDirectClients")} {`${option.count} ${t("someOne")}`}
          </Typography>
        </Grid>
        <Grid container justifyContent={"center"} mt={1} mb={2}>
          <Typography
            fontSize={12}
            color="#017874"
          >{`${option.percent}% ${t("FromTheEntirePortfolioOfClients")}`}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
};
