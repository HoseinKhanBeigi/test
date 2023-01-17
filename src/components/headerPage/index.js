import React, { useEffect } from "react";
import { convertDigits } from "persian-helpers";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { removeFilter } from "../../features/filter";
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
  DownloadIcon,
  ChangeViewIcom,
} from "../icons";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import IconButton from "@mui/material/IconButton";
import { createSearchParams, useNavigate } from "react-router-dom";
import { FilterDropDown } from "../filter";
import { Tabs } from "../tabs";
import { SearchInput } from "../search";

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
  handleChange,
  defaultQuery,
  analysis,
  action,
  changeview,
  dateFilter,
  filterPage,
  download,
  clientList,
  searchPage,
  children,
  handleChangeCheckBox,
  handleChangeRadio,
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

  const [openin, setOpen] = React.useState(false);

  const { filterList } = useSelector((state) => state.filterSlice);

  const handleDrawerOpen = () => {
    setOpen((pre) => !pre);
  };

  const handleCancel = () => {
    removeParams(["organization", "type", "bi_point"], navigate);
    dispatch(action({ params: { ...getQueryParams() } }));
    dispatch(removeFilter());
  };

  const handleExecution = () => {
    const { organization, userType, bi_point } = groupBy(filterList, "key");
    const params = {
      organization: organization?.map((e) => e.title).join(","),
      type: userType?.map((e) => e.title).join(","),
      bi_point: bi_point?.map((e) => e.title).join(","),
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

  useEffect(() => {
    dispatch(removeFilter());
  }, [title]);

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
              <Divider />
              <FilterDropDown
                defaultQuery={defaultQuery}
                items={initialDrops}
                handleChange={handleChange}
                handleChangeCheckBox={handleChangeCheckBox}
                handleChangeRadio={handleChangeRadio}
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
                clientList={clientList}
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
              {children}
              {searchPage && (
                <>
                  <SearchInput
                    defaultQuery={defaultQuery?.search}
                    action={action}
                    removeParams={removeParams}
                    openin={openin}
                  />

                  <IconButton
                    sx={{ p: "10px" }}
                    aria-label="menu"
                    onClick={handleDrawerOpen}
                  >
                    <SearchIcon />
                  </IconButton>
                </>
              )}

              {analysis && (
                <IconButton
                  sx={{ p: "10px" }}
                  aria-label="menu"
                  // onClick={handleCreate}
                >
                  <AnalysisIcon />
                </IconButton>
              )}
              {filterPage && (
                <IconButton
                  sx={{ p: "10px" }}
                  aria-label="menu"
                  onClick={handleFilterMenu}
                >
                  <SmartFilterIcon />
                </IconButton>
              )}

              {changeview && (
                <IconButton
                  sx={{ p: "10px" }}
                  aria-label="menu"
                  onClick={changeview}
                >
                  <ChangeViewIcom />
                </IconButton>
              )}

              {download && (
                <IconButton
                  sx={{ p: "10px" }}
                  aria-label="menu"
                  // onClick={handleCreate}
                >
                  <DownloadIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};
