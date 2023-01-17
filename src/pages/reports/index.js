import * as React from "react";
import { Grid } from "@mui/material";
import { Box, Link, Typography, Stack } from "@mui/material";
import { AppDashboard } from "../../components/areaChart";
import TextField from "@mui/material/TextField";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
// import {
//   UserIcon,
//   Polygon1,
//   Polygon2,
//   Polygon3,
//   PopupCity,
//   Yazed,
// } from "../../components/icons";
import { debounce } from "lodash";
import { MapIran } from "./map";
import CircularProgress from "@mui/material/CircularProgress";
import { HeaderPage } from "../../components/headerPage";
import { useTranslation } from "react-i18next";
import { searchInMap, searchReport } from "../../actions/reports";
import { useDispatch, useSelector } from "react-redux";
import { CardBranch, UserCard } from "./card";

export const Reports = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [branch, setBranch] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleChangeSearch = (e) => {
    const result = { search: e.target.value };
    if (e.target.value) {
      dispatch(searchReport(result)).then((e) => {
        const data = [];
        if (e.payload.status === 200) {
          setLoading(false);
          if (
            e.payload.data.branches.length > 0 ||
            e.payload.data.users.length > 0
          ) {
            const newData = [
              { branches: e.payload.data.branches },
              { users: e.payload.data.users },
            ];
            newData.map((branch, i) => {
              data.push(branch);
            });
            console.log(data);
            setBranch(data);
          } else if (e.payload.data.length === 0) {
            setBranch([]);
          }
        }
      });
    } else {
      setBranch([]);
    }
  };

  const debouncedResults = React.useMemo(() => {
    return debounce(handleChangeSearch, 500);
  }, []);

  React.useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  const handleDispatch = (item) => {
    if (item.name.d) {
      const result = { province: item.name.d };
      setLoading(true);
      dispatch(searchInMap(result)).then((e) => {
        const data = [];
        if (e.payload.status === 200) {
          setLoading(false);
          if (e.payload.data.length > 0) {
            const newData = [{ branches: e.payload.data }];
            newData.map((branch, i) => {
              data.push(branch);
            });
            setBranch(data);
          } else if (e.payload.data.length === 0) {
            setBranch([]);
          }
        }
      });
    }
  };

  return (
    <>
      <HeaderPage title={t("reports")} tab={false} />
      <Grid container dir="rtl" justifyContent={"space-between"}>
        <Grid item xl={4} md={4}>
          <Grid container mb={2}>
            <TextField
              fullWidth
              name={"search"}
              label={t(`search`)}
              type={"text"}
              typeForm={"create"}
              onInput={debouncedResults}
              InputProps={{
                sx: {
                  "& input": {
                    textAlign: "start",
                  },
                },
              }}
            />
          </Grid>

          {loading ? (
            <Grid container justifyContent={"center"}>
              <CircularProgress />
            </Grid>
          ) : branch.length === 0 ? (
            <Typography>{t("")}</Typography>
          ) : (
            branch?.map((k, j) => {
              if (k?.branches) {
                return k?.branches?.map((e, i) => (
                  <Grid container mb={2}>
                    <CardBranch
                      key={i}
                      name={e.name}
                      phone={e.phone}
                      address={e.address}
                      level={e.level}
                    />
                  </Grid>
                ));
              } else if (k?.users) {
                return k?.users?.map((e, i) => (
                  <Grid container mb={2}>
                    <UserCard
                      name={e.name}
                      position={e.position}
                      mobile={e.mobile}
                      organization={e.organization}
                    />
                  </Grid>
                ));
              }
            })
          )}
        </Grid>
        <Grid item xl={6} md={6}>
          <Grid container>
            <MapIran handleDispatch={handleDispatch} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
