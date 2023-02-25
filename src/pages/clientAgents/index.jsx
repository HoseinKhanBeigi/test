import { useTranslation } from "react-i18next";
import { clientAgentsAction, clientDetail } from "../../actions/clients";
import { useDispatchAction } from "../../hooks/useDispatchAction";
import { useDispatch, useSelector } from "react-redux";

import Checkbox from "@mui/material/Checkbox";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import noresult from "../interactions/noresult.png";
import Skeleton from "@mui/material/Skeleton";
import { useCheckBox } from "../../hooks/useCheckBox";
import { PaginationTable } from "../../components/pagination";
import { HeaderPage } from "../../components/headerPage";
import { SelectInput } from "../../components/selectInput";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const ClientAgents = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const header = [
    t("نام/نام خانوادگی"),
    t("تعداد مشتریان"),
    t("محل فعالیت"),
    t("متوسط تغییرات دسته مشتریان"),
    t("شماره تماس"),
  ];
  //   const dispatch = useDispatch();
  const { entities, status } = useSelector((state) => state.ClientAgentsSlice);
  //   useDispatchAction(AgentsAction, status);

  useEffect(() => {
    const id = params.id;
    if (status === "idle") {
      dispatch(
        clientAgentsAction({
          id,
        })
      );
    }
  }, [status, dispatch]);
  const useCheckBoxSelector = useCheckBox(status, entities);
  const handleSelectAll = (item) => {
    useCheckBoxSelector.dispatchAction({ type: "SELECTALL" });
  };
  const handleSelect = (i) => {
    useCheckBoxSelector.dispatchAction({ type: "SELECTITEM", id: i });
  };

  const [typeSearch, setTypeSearch] = useState("");

  const hanldeChangeTypeSearch = (event) => {
    setTypeSearch(event.target.value);
    navigate(`/${event.target.value}`);
  };

  return (
    <>
      <HeaderPage
        title={t("searchAgent")}
        searchPage
        action={clientAgentsAction}
        entities={entities}
        width={252}
        paramsId={params.id}
        status={status}
      />

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
                          <TableCell align="left">{"-"}</TableCell>
                          <TableCell align="left">{"-"}</TableCell>
                          <TableCell align="left">{"-"}</TableCell>
                          <TableCell align="left">{row.phone}</TableCell>
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
              entities?.data?.dada?.length === 0) && <img src={noresult} />}
        </Paper>
        <Paper>
          <PaginationTable
            status={status}
            entities={entities}
            action={clientAgentsAction}
          />
        </Paper>
      </Box>
    </>
  );
};
