import { useTheme } from "@mui/material/styles";
import { Grid, Card, Typography, Box } from "@mui/material";

export const CardBox = ({ children, title, value }) => {
  const theme = useTheme();
  return (
    <Grid
      container
      dir="rtl"
      p={1}
      alignItems="center"
      justifyContent={"space-around"}
    >
      <Box
        sx={{
          background: theme.palette.primary.main,
          width: "40px",
          height: "40px",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Typography color={"#777777"} fontSize={"0.8rem"}>
          {title}
        </Typography>
      </Box>
    </Grid>
  );
};

export const CardDetail = ({ title, children, value, scroll }) => {
  return (
    <Card
      sx={{
        height: !scroll ? "100%" : "300px",
        overflowY: !scroll ? "hidden" : "scroll",
      }}
    >
      <CardBox title={title}>{children}</CardBox>
      <Grid container justifyContent={"center"}>
        {value}
      </Grid>
    </Card>
  );
};

export const CardButtom = ({
  children,
  title,
  background,
  handleRoute,
  keyRoute,
}) => {
  return (
    <Card
      sx={{ background: "#F6F6F6", cursor: "pointer" }}
      onClick={() => handleRoute(keyRoute)}
    >
      <Box
        sx={{
          height: "136px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            background,
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </Box>
        <Typography>{title}</Typography>
      </Box>
    </Card>
  );
};
