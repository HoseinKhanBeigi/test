import { useDispatchAction } from "../../../hooks/useDispatchAction";
import { UserManagerAction } from "../../../actions/admin";
import Checkbox from "@mui/material/Checkbox";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Notifier from "../../../components/notify";
import Skeleton from "@mui/material/Skeleton";
import { convertDigits } from "persian-helpers";
import { useCheckBox } from "../../../hooks/useCheckBox";
import { PaginationTable } from "../../../components/pagination";

export const UserManager = () => {
    const { t } = useTranslation();
    const header = [
        t("fullName"),
        t("countClients"),
        t("placeAction"),
        t("Average_changes"),
        t("phonenumber"),
        t("طبقه ی بازاریاب"),
      ];

  const { entities, status } = useSelector((state) => state.userManagerSlice);
  useDispatchAction(UserManagerAction, status);
  const useCheckBoxSelector = useCheckBox(status, entities);
  const handleSelectAll = (item) => {
    useCheckBoxSelector.dispatchAction({ type: "SELECTALL" });
  };
  const handleSelect = (i) => {
    useCheckBoxSelector.dispatchAction({ type: "SELECTITEM", id: i });
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        justifyContent: "space-between",
        background: "#fff",
      }}
    >
      <Paper sx={{ width: "100%" }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table" dir="rtl">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#EFF3F3" }}>
                <TableCell padding="checkbox">
                  <Checkbox color="primary" onClick={handleSelectAll} />
                </TableCell>
                {header.map((e, i) => (
                  <TableCell align="left" key={i}>
                    {e}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {status !== "succeeded"
                ? [...Array(7)].map((_, i) => (
                    <TableRow role="checkbox" key={i}>
                      {[...Array(7)].map((_, k) => (
                        <TableCell>
                          <Box>
                            <Skeleton
                              key={k}
                              width={40}
                              variant="rectangular"
                              sx={{ my: 4, mx: 1 }}
                            />
                          </Box>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : entities?.data?.data.map((row, i) => {
                    let part1 = row?.mobile?.slice(0, 4);
                    let part2 = row?.mobile?.slice(4, 7);
                    let part3 = row?.mobile?.slice(7, 9);
                    let part4 = row?.mobile?.slice(9, 11);
                    return (
                      <TableRow key={i} role="checkbox">
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={useCheckBoxSelector.items[i].checked}
                            onClick={() => handleSelect(row.id)}
                          />
                        </TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{""}</TableCell>
                        <TableCell align="left">{row.organization}</TableCell>
                        <TableCell align="left">{""}</TableCell>
                        <TableCell align="left">
                          {convertDigits(part4)} {convertDigits(part3)}{" "}
                          {convertDigits(part2)} {convertDigits(part1)}
                        </TableCell>
                        <TableCell align="left">{row.level}</TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Paper sx={{ display: "flex", justifyContent: "center" }}>
        {status === "succeeded" &&
          (entities?.data?.total === 0 ||
            entities?.data?.dada?.length === 0) && (
            <Typography>{t("no data")}</Typography>
          )}
      </Paper>
      <Paper>
        <PaginationTable
          status={status}
          entities={entities}
          action={UserManagerAction}
        />
      </Paper>
    </Box>
  );
};
