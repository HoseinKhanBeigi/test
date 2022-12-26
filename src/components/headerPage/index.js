import React, {
  useMemo,
  useEffect,
  useRef,
  useCallback,
  useState,
} from "react";

import { convertDigits } from "persian-helpers";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useReducer } from "react";
import {
  getQueryParams,
  groupBy,
  appendSearchParams,
  removeParams,
} from "../../utils";

import {
  SearchIcon,
  AnalysisIcon,
  SmartFilterIcon,
  LoadingIcon,
  DownloadIcon,
  ChangeViewIcom,
} from "../icons";
import { useSearchParams } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { createSearchParams, useNavigate, useLocation } from "react-router-dom";
import { FilterDropDown } from "../filter";
import { Tabs } from "../tabs";
import { debounce, isArray } from "lodash";
import { CustomDateRangePickerDay } from "../dateRangePicker";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

export const HeaderPage = ({
  title,
  entities,
  status,
  page,
  tab,
  initialTabs,
  initialDrops,
  defaultQuery,
  analysis,
  action,
  changeview,
  dateFilter,
}) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFilterMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(false);
  };

  const TextInput = styled(TextField, {
    shouldForwardProp: (prop) => prop !== "openwidth",
  })(({ theme, openwidth }) => ({
    width: "0px",
    ...(openwidth && {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      width: `${240}px`,
    }),
  }));

  const [openin, setOpen] = React.useState(false);

  const [filterList, setFilterList] = useState([]);

  const onFilterDropDown = (e) => {
    if (e.checked) {
      setFilterList((pre) => [...pre, { name: e.name, key: e.key }]);
    }
    if (e.checked === false) {
      let filterItems = [...filterList];
      let filterItems2 = filterItems.filter(
        (element) => e.name !== element.name
      );
      setFilterList(filterItems2);
    }
  };

  const handleDrawerOpen = () => {
    setOpen((pre) => !pre);
  };

  const filtersList = useRef([]);
  const onFilter = (e) => {
    filtersList.current.push({ name: e.name, key: e.key });
    if (e.checked === false) {
      filtersList.current = filtersList.current.filter(
        (element) => e.name !== element.name
      );
    }
  };

  const handleCancel = () => {
    removeParams(["organization", "type", "bi_point"], navigate);
    filtersList.current = [];
    dispatch(action({ params: { ...getQueryParams() } }));
  };

  const handleExecution = () => {
    const { organizations, type, bi_point } = groupBy(
      filtersList.current,
      "key"
    );
    const params = {
      organization: organizations?.map((e) => e.name).join(","),
      type: type?.map((e) => e.name).join(","),
      bi_point: bi_point?.map((e) => e.name).join(","),
    };

    const defaults = { ...getQueryParams() };
    delete defaults.page;
    delete defaults.organization;
    delete defaults.type;
    delete defaults.bi_point;
    setSearchParams(
      appendSearchParams({ ...defaults, ...params }, searchParams)
    );
    dispatch(action({ params: params }));
  };

  const handleChangeSearch = (e) => {
    if (e.target.value !== "") {
      const params = { ...getQueryParams(), search: e.target.value };
      navigate({
        search: `?${createSearchParams(params)}`,
      });
      delete params.page;
      dispatch(action({ params: params }));
    } else if (e.target.value === "") {
      removeParams("search", navigate);
      dispatch(action({ params: { ...getQueryParams() } }));
    }
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleChangeSearch, 500);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  const actiontype = "DROPDOWN";
  const property = "title";
  const status1 = "open";
  const reducer = (state, action) => {
    switch (action.type) {
      case `${actiontype}`:
        return state.map((item) => {
          if (item[property] === action[property]) {
            return { ...item, [status1]: !item[status1] };
          } else {
            return item;
          }
        });
      default:
        return state;
    }
  };

  const handleChange = (item) => {
    dispatch1({ type: `${actiontype}`, [property]: item[property] });
  };
  const [items, dispatch1] = useReducer(reducer, initialDrops);

  const [valueDate, setValue] = React.useState([null, null]);

  const onAccept = (item) => {
    const date1 = dayjs(item[0]).format("YYYY-MM-DD");
    const date2 = dayjs(item[1]).format("YYYY-MM-DD");

    const params = {
      ...getQueryParams(),
      from: date1 !== "InvalidDate" && date1,
      to: date2 !== "InvalidDate" && date2,
    };
    navigate({
      search: `?${createSearchParams(params)}`,
    });
    dispatch(action({ params: { ...getQueryParams() } }));
  };

  const { statusDashboard, entitiesDashboard, error } = useSelector(
    (state) => state.dashboardAppSlice
  );

  const tabData = [];
  if (tab) {
    initialTabs[0]?.values.filter((e) => {
      if (e.name >= entitiesDashboard?.data?.user?.level) {
        tabData.push(e);
      }
    });
  }

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={anchorEl}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "188px",
            padding: "12px",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "& .MuiListItemButton-root": {
              padding: 0,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              left: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Grid item>
          {dateFilter ? (
            <CustomDateRangePickerDay
              valueDate={valueDate}
              setValue={setValue}
              onAccept={onAccept}
            />
          ) : (
            <>
              {" "}
              <Divider />
              <FilterDropDown
                initialReducer={initialDrops}
                defaultQuery={defaultQuery}
                filtersList={filtersList}
                actiontype="DROPDOWN"
                property="title"
                status="open"
                onFilterDropDown={onFilterDropDown}
                onFilter={onFilter}
                items={items}
                handleChange={handleChange}
              />
              <Grid container justifyContent={"space-between"} mt={2}>
                <Button
                  sx={{ background: "#EFF3F3", width: "70px" }}
                  onClick={handleCancel}
                >
                  {t("cancel")}
                </Button>
                <Button
                  sx={{ width: "85px" }}
                  variant="contained"
                  disabled={filterList.length === 0}
                  onClick={handleExecution}
                >
                  {t("execution")}
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Menu>
      <Grid
        container
        flexDirection={"row-reverse"}
        alignItems="center"
        columns={16}
        justifyContent="space-between"
        mb={4}
        mt={2}
      >
        <Grid item xl={4}>
          <Grid container dir="rtl" gap={1}>
            <Typography className="title">{title}</Typography>
            {page === "table" && (
              <>
                <Typography color={"#3B3B3B"}>
                  {convertDigits(1)}-
                  {status === "succeeded" &&
                    convertDigits(entities?.data.per_page)}
                </Typography>
                <Typography color={"#3B3B3B"}>{t("from")}</Typography>
                <Typography color={"#3B3B3B"}>
                  {status === "succeeded" &&
                    convertDigits(entities?.data.total)}{" "}
                  {t("person")}
                </Typography>
              </>
            )}

            {page === "detail" && (
              <>
                <Typography>{entities?.name}</Typography>
                <Typography color="#FF2020">
                  <Link
                    onClick={() => navigate(-1)}
                    color="#FF2020"
                    style={{ color: "#FF2020" }}
                  >
                    {t("returnToPreviousPage")}
                  </Link>
                </Typography>
              </>
            )}
            {page === "form" && (
              <Typography color="#FF2020">
                <Link onClick={() => navigate(-1)} style={{ color: "#FF2020" }}>
                  {t("returnToPreviousPage")}
                </Link>
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid item xl={6}>
          {tab && tabData.length > 2 && (
            <Grid container justifyContent={"end"} flexDirection="row-reverse">
              <Tabs
                actionFilter={action}
                initialReducer={tabData}
                actiontype={initialTabs[0].inputType}
                keyss={initialTabs[0].key}
                property="name"
                status="checked"
              />
            </Grid>
          )}
        </Grid>
        {page !== "form" && page !== "dashboard" && (
          <Grid item xl={6}>
            <Grid
              container
              flexDirection={"row-reverse"}
              justifyContent="flex-end"
              alignItems={"center"}
            >
              <TextField
                id="standard-basic"
                label="جستجو"
                variant="standard"
                type="text"
                name="search"
                defaultValue={defaultQuery?.search}
                onInput={debouncedResults}
              />

              <IconButton
                sx={{ p: "10px" }}
                aria-label="menu"
                onClick={handleDrawerOpen}
              >
                <SearchIcon />
              </IconButton>
              {analysis && (
                <IconButton
                  sx={{ p: "10px" }}
                  aria-label="menu"
                  // onClick={handleCreate}
                >
                  <AnalysisIcon />
                </IconButton>
              )}

              <IconButton
                sx={{ p: "10px" }}
                aria-label="menu"
                onClick={handleFilterMenu}
              >
                <SmartFilterIcon />
              </IconButton>
              {changeview && (
                <IconButton
                  sx={{ p: "10px" }}
                  aria-label="menu"
                  onClick={changeview}
                >
                  <ChangeViewIcom />
                </IconButton>
              )}

              <IconButton
                sx={{ p: "10px" }}
                aria-label="menu"
                // onClick={handleCreate}
              >
                <DownloadIcon />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};
