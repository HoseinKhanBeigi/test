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
import { createSearchParams, useNavigate } from "react-router-dom";

export const Tabs = ({
  filterRMTabs,
  status,
  entitiesDashboard,
  statusDashboard,
  actionFilter,
  clientList,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      removeParams("level");

      dispatch(actionFilter({ params: { ...getQueryParams() } }));
    } else {
      const params = { ...getQueryParams(), level: item.name };
      navigate({
        search: `?${createSearchParams(params)}`,
      });
      delete params.page;

      dispatch(actionFilter({ params: params }));
    }
    dispatch(filterActionTab({ name: item.name }));
  };

  useEffect(() => {
    if (statusDashboard === "succeeded") {
      dispatch(filterRm({ entitiesDashboard: entitiesDashboard }));
    }
  }, [statusDashboard]);

  return (
    <>
      {statusDashboard === "succeeded" &&
        filterRMTabs.length > 2 &&
        filterRMTabs.map((e, i) => (
          <Grid
            key={i}
            item
            padding={1}
            onClick={() => handleChange(e)}
            sx={{
              background: e.checked ? e.background : "",
            }}
          >
            {i === 1 && clientList ? (
              <Typography
                color={e.checked ? e.color : "#3B3B3B"}
                sx={{ cursor: "pointer" }}
              >
                {"شخصی"}
              </Typography>
            ) : (
              <>
                {" "}
                <Typography
                  color={e.checked ? e.color : "#3B3B3B"}
                  sx={{ cursor: "pointer" }}
                >
                  {t(`${e.name}`)}
                </Typography>
              </>
            )}
          </Grid>
        ))}
    </>
  );
};
