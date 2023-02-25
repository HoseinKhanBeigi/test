import { Grid, Typography, Button, Card } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { DropDownIcon, NoteIcon } from "../../../components/icons";
import IconButton from "@mui/material/IconButton";

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
  cursor: "pointer",
}));

const BoxInfo = styled(Box)(({ theme, dropDown }) => ({
  background: "#F9F9F9",
  width: "100%",
  height: theme.spacing(8),
  display: dropDown ? "none" : "flex",
  position: dropDown ? "absolute" : "relative",
  top: 0,
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

export const ClientHeaderButton = ({ children, name, handleClick }) => {
  return (
    <Grid container item xs alignItems={"center"} flexDirection="column">
      <BoxButtom onClick={handleClick}>{children}</BoxButtom>
      <Typography color="#2563EB">{name}</Typography>
    </Grid>
  );
};

export const ClientInfo = ({ children, infokey, dropDown, handleClick }) => {
  return (
    <BoxInfo dropDown={dropDown}>
      <Grid container justifyContent={"space-between"} alignItems="center">
        <Typography color={"#777777"} fontSize={13}>
          {infokey}
        </Typography>
        {handleClick && (
          <IconButton aria-label="menu" onClick={handleClick}>
            <DropDownIcon />
          </IconButton>
        )}
      </Grid>
      {children}
    </BoxInfo>
  );
};

export const BoxButton = ({ children, value, handleClick, background }) => {
  return (
    <Button variant="text" onClick={handleClick}>
      <Card
        sx={{
          background: background,
          color: "white",
          textAlign: "center",
          padding: "4px",
        }}
      >
        {children}
        <Typography>{value}</Typography>
      </Card>
    </Button>
  );
};
