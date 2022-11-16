import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Stack } from "@mui/system";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";

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

export const TableHoc = ({ header }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {header.map((e, i) => (
                  <TableCell align="right" key={i}>
                    {e}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell align="right">{row.fullName}</TableCell>
                  <TableCell align="right">{row.countUser}</TableCell>
                  <TableCell align="right">{row.placeAction}</TableCell>
                  <TableCell align="right">{row.changing}</TableCell>
                  <TableCell align="right">{row.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            count={10}
            color="secondary"
            sx={{

              "& > *": {
                paddingTop:"72px !important",
                paddingBottom:"12px !important",
                justifyContent:"center",
              }
            }}
          />
        </TableContainer>
      </Paper>
    </Box>
  );
};
