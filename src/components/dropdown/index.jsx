import React, { useEffect, useState, useRef } from "react";
import { useReducer } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import Button from "@mui/material/Button";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { Typography } from "@mui/material";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import { Checkbox } from "@mui/material";
import { useTranslation } from "react-i18next";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";

export const DropDown = ({
  open,
  handleClick,
  data,
  status,
  property,
  onFilter,
  onFilterDropDown,
  defaultQuery,
  filtersList,
}) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const { t } = useTranslation();

  let defaults = useRef([]);


  const reducer = (state, action) => {
    switch (action.type) {
      case "CHECKBOX":
        return state.map((item) => {
           if (item[property] === action[property]) {
            onFilter({ ...item, [status]: !item[status] });
            onFilterDropDown({ ...item, [status]: !item[status] });
            return { ...item, [status]: !item[status] };
          } else {
            return item;
          }
        });
      case "RADIO":
        return state.map((item) => {
          if (item[property] === action[property]) {
            onFilter({ ...item, [status]: !item[status] });
            onFilterDropDown({ ...item, [status]: !item[status] });
            return { ...item, [status]: !item[status] };
          } else {
            onFilter({ ...item, [status]: false });
            return { ...item, [status]: false };
          }
        });
      default:
        return state;
    }
  };

  const handleChangeCheckBox = (item) => {
    dispatch({ type: "CHECKBOX", [property]: item[property] });
  };

  const handleChangeRadio = (item) => {
    dispatch({ type: "RADIO", [property]: item[property] });
  };

  const [items, dispatch] = useReducer(reducer, data.values);

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        dir="rtl"
        sx={{ justifyContent: "space-between", marginTop: "16px" }}
      >
        <Typography> {t(`${data.title}`)}</Typography>

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto">
        <List component="div" disablePadding sx={{ marginBottom: "16px" }}>
          {items.map((e, i) => {
            return (
              <Grid
                key={i}
                container
                alignItems={"center"}
                justifyContent="flex-end"
              >
                <Typography>{t(`${e[property]}`)}</Typography>
                {data.inputType === "CHECKBOX" ? (
                  <Checkbox
                    checked={e[status]}
                    {...label}
                    onChange={() => handleChangeCheckBox(e)}
                  />
                ) : (
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="type"
                    value={e[property]}
                    checked={e[status]}
                    onChange={() => handleChangeRadio(e)}
                  >
                    <FormControlLabel
                      defaultValue={defaultQuery.type}
                      checked={e[status]}
                      value={e[status] && e[property]}
                      control={<Radio />}
                    />
                  </RadioGroup>
                )}
              </Grid>
            );
          })}
        </List>
        <Divider />
      </Collapse>
    </>
  );
};
