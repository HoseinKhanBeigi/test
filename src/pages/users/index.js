import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { TableHoc } from "../../components/table";
export const Users = () => {
  const header = ["fullName", "countUser", "placeAction", "changing", "phone"];
  return (
    <Grid container>
      <TableHoc header={header} />
    </Grid>
  );
};
