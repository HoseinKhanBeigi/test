import React, { useEffect } from "react";
import { convertDigits } from "persian-helpers";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { removeFilterUser, removeFilterClient } from "../../features/filter";
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
  PlusIcon,
  CreateIcon,
  NavigationIcon,
} from "../icons";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import IconButton from "@mui/material/IconButton";
import { createSearchParams, useNavigate } from "react-router-dom";
import { FilterDropDown } from "../filter";
import { Tabs } from "../tabsFilter";
import { SearchInput } from "../search";

import { CustomDateRangePickerDay } from "../dateRangePicker";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { TabButtons } from "../tabButton";

export const HeaderPage = ({
  title,
  entities,
  status,
  page,
  tab,
  initialDrops,
  filterRMTabs,
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
  ButtonTabs,
  handleButtons,
  instructionTab,
  createInstructions,
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
    removeParams(["organization", "type", "bi_point", "gender"], navigate);
    dispatch(action({ params: { ...getQueryParams() } }));
    dispatch(removeFilterUser());
    dispatch(removeFilterClient());
  };

  const handleExecution = () => {
    const { organization, userType, bi_point, clientType, gender } = groupBy(
      filterList,
      "key"
    );
    const params = {
      organization: organization?.map((e) => e.title).join(","),
      type: clientType
        ? clientType?.map((e) => e.title).join(",")
        : userType?.map((e) => e.title).join(","),
      bi_point: bi_point?.map((e) => e.title).join(","),
      gender: gender?.map((e) => e.title).join(","),
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
    dispatch(removeFilterUser());
    dispatch(removeFilterClient());
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
      <Paper>
        <Grid
          container
          flexDirection={"row-reverse"}
          alignItems="center"
          columns={16}
          justifyContent="space-between"
          mb={4}
          mt={2}
        >
          <Grid item xl={3}>
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
                 
                  <NavigationIcon />
                  <Typography>{entities?.name}</Typography>
                  <Typography color={"gray"}>{`(${entities?.level})`}</Typography>
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
                  <Link
                    onClick={() => navigate(-1)}
                    style={{ color: "#FF2020" }}
                  >
                    {t("returnToPreviousPage")}
                  </Link>
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid item xl={7}>
            {tab && (
              <Grid
                container
                justifyContent={"end"}
                flexDirection="row-reverse"
              >
                <Tabs
                  actionFilter={action}
                  filterRMTabs={filterRMTabs}
                  entitiesDashboard={entitiesDashboard}
                  statusDashboard={statusDashboard}
                  status={status}
                  clientList={clientList}
                />
              </Grid>
            )}
            {ButtonTabs && (
              <Grid container justifyContent={"end"}>
                <TabButtons
                  ButtonTabs={ButtonTabs}
                  handleButtons={handleButtons}
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
                {instructionTab && (
                  <IconButton
                    sx={{ p: "10px" }}
                    aria-label="menu"
                    onClick={createInstructions}
                  >
                    <CreateIcon />
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
      </Paper>
    </>
  );
};
