import { DropDown } from "../dropdown";
import React, { useEffect, useState } from "react";
import { useReducer } from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getQueryParams } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { filterActionTab, filterRm } from "../../features/tabs";
import { isArray } from "lodash";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

export const Tabs = ({
  filterRMTabs,
  status,
  userDetails,
  entitiesDashboard,
  paramsId,
  statusDashboard,
  actionFilter,
  clientList,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { t } = useTranslation();
  const defaultQuery = { ...getQueryParams() };
  // console.log(location)

  function removeParams(keys) {
    let params = new URLSearchParams(window.location.search);
    if (isArray(keys)) {
      keys.map((e) => params.delete(e));
    } else {
      params.delete(keys);
    }
    navigate({
      search: `?${createSearchParams(params)}`,
    });
  }

  const handleChange = (item) => {
    if (item.name === "all") {
      if (clientList) {
        removeParams("user");
      } else {
        removeParams("level");
      }
      removeParams("page");

      if (paramsId) {
        const id = paramsId;
        dispatch(actionFilter({ id, params: { ...getQueryParams() } }));
      } else {
        dispatch(actionFilter({ params: { ...getQueryParams() } }));
      }
    } else {
      let params = "";
      if (clientList) {
        params = { ...getQueryParams(), user: item.name };
      } else {
        params = { ...getQueryParams(), level: item.name };
      }

      navigate({
        search: `?${createSearchParams(params)}`,
      });
      delete params.page;

      if (paramsId) {
        const id = paramsId;
        dispatch(actionFilter({ id, params: params }));
      } else {
        dispatch(actionFilter({ params: params }));
      }
    }

    dispatch(filterActionTab({ name: item.name }));
  };

  useEffect(() => {
    if (statusDashboard === "succeeded" && !paramsId) {
      dispatch(filterRm({ level: entitiesDashboard?.data?.user?.level }));

      if (defaultQuery?.user) {
        dispatch(filterActionTab({ name: defaultQuery?.user }));
      } else if (defaultQuery?.level) {
        dispatch(filterActionTab({ name: defaultQuery?.level }));
      } else if (
        defaultQuery?.user === undefined ||
        defaultQuery?.level === undefined
      ) {
        dispatch(filterActionTab({ name: "all" }));
      }
    }
  }, [statusDashboard]);

  useEffect(() => {
    if (status === "succeeded") {
      if (paramsId && userDetails) {
        dispatch(
          filterRm({ level: userDetails?.data?.user?.level, filterTab: "all" })
        );
      }

      const defaultQuery = { ...getQueryParams() };
      if (defaultQuery?.level) {
        dispatch(filterActionTab({ name: defaultQuery?.level }));
      }
    }
  }, [status]);

  return (
    <>
      {statusDashboard === "succeeded" &&
        filterRMTabs.length > 2 &&
        filterRMTabs.map((e, i) => {
          return (
            <Grid
              key={i}
              item
              padding={1}
              onClick={() => handleChange(e)}
              sx={{
                background: e.checked ? e.background : "",
              }}
            >
              <>
                <Typography
                  color={e.checked ? e.color : "#3B3B3B"}
                  sx={{ cursor: "pointer" }}
                >
                  {t(`${e.name}`)}
                </Typography>
              </>
            </Grid>
          );
        })}
    </>
  );
};
