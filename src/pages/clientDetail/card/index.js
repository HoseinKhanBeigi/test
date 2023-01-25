import { Grid, Typography,Button,Card } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { NoteIcon } from "../../../components/icons";

const BoxType = styled(Box, {
  shouldForwardProp: (prop) => prop !== "background",
})(({ theme, background }) => ({
  width: theme.spacing(8),
  height: theme.spacing(4),
  background: background,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: theme.spacing(2),
}));

const BoxButtom = styled(Box)(({ theme }) => ({
  width: theme.spacing(5),
  height: theme.spacing(5),
  borderRadius: "50%",
  background: "#2563EB",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const BoxInfo = styled(Box)(({ theme }) => ({
  background: "#F9F9F9",
  width: "100%",
  height: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(1),
}));

export const PositionInfo = styled(Box)(({ theme }) => ({
  background: "#F7C3E0",
  width: theme.spacing(8),
  height: theme.spacing(3),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: theme.spacing(2),
}));

export const ClientHeaderCard = ({ value, type, background, color }) => {
  return (
    <Grid container alignItems={"center"}>
      <Grid item xs={9}>
        <Grid container justifyContent={"flex-start"}>
          <Typography>{value}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <BoxType background={background}>
          <Typography color={color} fontSize={14} fontWeight={100}>
            {type}
          </Typography>
        </BoxType>
      </Grid>
    </Grid>
  );
};

export const ClientHeaderButton = ({ children, name }) => {
  return (
    <Grid container item xs alignItems={"center"} flexDirection="column">
      <BoxButtom>{children}</BoxButtom>
      <Typography color="#2563EB">{name}</Typography>
    </Grid>
  );
};

export const ClientInfo = ({ children, infokey }) => {
  return (
    <BoxInfo>
      <Grid container>
        <Typography color={"#777777"} fontSize={13}>
          {infokey}
        </Typography>
      </Grid>
      {children}
    </BoxInfo>
  );
};

export const BoxButton = ({ children,value, handleClick,background }) => {
  return (
    <Button variant="text" onClick={handleClick}>
      <Card
        sx={{
          background: background,
          color: "white",
          textAlign: "center",
          padding:"4px"
        }}
      >
        {children}
        <Typography>{value}</Typography>
      </Card>
    </Button>
  );
};
