import { DropDown } from "../dropdown";
import React, { useEffect, useState } from "react";
import { useReducer } from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getQueryParams } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { isArray } from "lodash";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export const Tabs = ({
  initialReducer,
  actiontype,
  property,
  status,
  keyss,
  onFilterTabs,
  actionFilter,
  clientList
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const reducer = (state, action) => {
    switch (action.type) {
      case "TABS":
        return state.map((item) => {
          if (item[property] === action[property]) {
            return { ...item, [status]: !item[status] };
          } else {
            return { ...item, [status]: false };
          }
        });
      default:
        return state;
    }
  };

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
      removeParams(keyss);
      dispatch(actionFilter({ params: { ...getQueryParams() } }));
    } else {
      const params = { ...getQueryParams(), [keyss]: item.name };
      navigate({
        search: `?${createSearchParams(params)}`,
      });
      delete params.page;
      dispatch(actionFilter({ params: params }));
    }
    dispatchAction({ type: "TABS", [property]: item[property] });
  };

  const [items, dispatchAction] = useReducer(reducer, initialReducer);
  return (
    <>
      {items.map((e, i) => (
        <Grid
          key={i}
          item
          padding={1}
          onClick={() => handleChange(e)}
          sx={{
            background: e[status] ? e.background : "",
          }}
        >
          {i === 1 && clientList? (
           <Typography
           color={e[status] ? e.color : "#3B3B3B"}
           sx={{ cursor: "pointer" }}
         >
           {"خودم"}
         </Typography>
          ) : (
            <>
              {" "}
              <Typography
                color={e[status] ? e.color : "#3B3B3B"}
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
