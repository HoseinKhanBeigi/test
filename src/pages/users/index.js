import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import { TableHoc } from "../../components/table";
import { TrashIcone, OptionIcone, EditIcon } from "../../components/icons";

export const Users = () => {
  const header = [
    "fullName",
    "countUser",
    "placeAction",
    "changing",
    "phone",
    "",
  ];
  const handleClick = () => {
    console.log("asdsa");
  };

  function createData(fullName, countUser, placeAction, changing, phone) {
    return { fullName, countUser, placeAction, changing, phone };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];
  return (
    <Grid container>
      <TableHoc header={header}>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell padding="checkbox">
                <Checkbox color="primary" />
              </TableCell>
              <TableCell align="right">{row.fullName}</TableCell>
              <TableCell align="right">{row.countUser}</TableCell>
              <TableCell align="right">{row.placeAction}</TableCell>
              <TableCell align="right">{row.changing}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">
                <span onClick={handleClick}>
                  <TrashIcone />
                </span>
                <span onClick={handleClick}>
                  <EditIcon />
                </span>
                <span onClick={handleClick}>
                  <OptionIcone />
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableHoc>
    </Grid>
  );
};
