// import Box from "@mui/material/Box"
import { Typography, Box } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import {
  DownloadIcon,
  EditIcon,
  TrashIcone,
} from "../../../../components/icons";
import pdf from "./pdf.png";
// import Typography from "../../../../theme/overrides/Typography"

export const CardInstructure = ({
  url,
  date,
  type,
  name,
  downloadAction,
  trashAction,
  editAction,
  item,
}) => {
  return (
    <Card sx={{ width: "176px", height: "224px" }}>
      <Grid
        container
        justifyContent={"center"}
        sx={{ height: "100%" }}
        alignItems="center"
      >
        <img src={pdf} />
        <Grid container justifyContent={"center"}>
          <Typography>{date}</Typography>
          <Box>{type}</Box>
        </Grid>
        <Typography>{name}</Typography>
        <Grid container justifyContent={"space-evenly"}>
          <BoxAction background={"#5041BC"}>
            <a
              href={`http://10.154.65.29:9000/${url}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "23px",
              }}
            >
              <DownloadIcon stroke="white" />
            </a>
          </BoxAction>
          <BoxAction
            background={"#FF6370"}
            handleClick={() => trashAction(item)}
          >
            <TrashIcone stroke="white" />
          </BoxAction>
          <BoxAction
            background={"#FFC42C"}
            handleClick={() => editAction(item)}
          >
            <EditIcon stroke="white" />
          </BoxAction>
        </Grid>
      </Grid>
    </Card>
  );
};

const BoxAction = ({ handleClick, children, background }) => {
  return (
    <IconButton
      sx={{
        width: "36px",
        height: "29px",
        borderRadius: "8px",
        background: background,
      }}
      aria-label="menu"
      onClick={handleClick}
    >
      {children}
    </IconButton>
  );
};
