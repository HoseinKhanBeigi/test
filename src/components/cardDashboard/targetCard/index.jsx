import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import { Card } from "@mui/material";
import { Typography } from "@mui/material";
const Image = React.lazy(async () => await import("../../../components/image"));
export const TargetCard = () => {
  const { t } = useTranslation();
  return (
    <Card sx={{ padding: "16px", height: "100%" }}>
      <Grid container rowSpacing={6} justifyContent="end">
        <Grid item container justifyContent={"space-between"}>
          <Typography>{t("yourDistanceRelativeToTarget")}</Typography>
          {/* <Typography>{"در حال حاضر هدفی تعریف نشده است"}</Typography> */}
          <>
            <Box sx={{ position: "relative" }}>
              {/* <input
                  className="toggle"
                  type="checkbox"
                  role="switch"
                  name="toggle"
                  value="on"
                /> */}
              {/* <Box
                  sx={{
                    position: "absolute",
                    top: 3,
                    display: "flex",
                    width: "253px",
                    paddingLeft: "12px",
                    paddingRight: "20px",
                    justifyContent: "space-between",
                  }}
                >
                  <span>خود</span>
                  <span>هم گروه ها</span>
                </Box> */}

              {/* <Typography>{"خود"}</Typography> */}
            </Box>
          </>
        </Grid>

        <Grid container alignItems={"center"}>
          <Grid item xs={6}>
            <Typography fontSize={12} color="gray">
             {t("noTargetHasBeenDefinedAtThisTime")}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Image src={"nodata"} width="200" />
          </Grid>
        </Grid>

        {/* <Grid item container>
            <RankBox background={"#F6541E"} val="رتبه شما" />
            <RankBox background={"#F6541E"} val="هدف" />
          </Grid>
          <Grid item container justifyContent="end">
            <Box
              sx={{
                width: "100%",
                maxWidth: "480px",
                height: "10px",
                background: "rgba(0, 0, 0, 0.12)",
                borderRadius: "28px",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "80%",
                  height: "10px",
                  background: "#F7541E",
                  borderRadius: "28px",
                  position: "absolute",
                }}
              ></Box>
            </Box>
          </Grid> */}
      </Grid>
    </Card>
  );
};
