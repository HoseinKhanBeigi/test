import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";

export const TableHoc = ({ header, children }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table" dir="rtl">
            <TableHead>
              <TableRow sx={{backgroundColor:"#EFF3F3"}}>
                <TableCell align="right">
                  <Checkbox color="primary" />
                </TableCell>
                {header.map((e, i) => (
                  <TableCell align="right" key={i}>
                    {e}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {children}
          </Table>
          <Pagination
            count={10}
            color="secondary"
            sx={{
              "& > *": {
                paddingTop: "72px !important",
                paddingBottom: "12px !important",
                justifyContent: "center",
              },
            }}
          />
        </TableContainer>
      </Paper>
    </Box>
  );
};
