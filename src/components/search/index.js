import { styled, useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import React, { useEffect, useMemo, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQueryParams } from "../../utils";
import { debounce } from "lodash";
import { Autocomplete, Grid } from "@mui/material";
import styles from "./CssModulesSlider.module.css";

const TextInput = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "openwidth",
})(({ theme, openwidth, width }) => ({
  width: "0px",
  ...(openwidth && {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: `${width}px`,
  }),
}));
export const SearchInput = ({
  defaultQuery,
  action,
  removeParams,
  paramsId,
  openin,
  width = 240,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const handleChangeSearch = (e) => {
    if (e.target.value !== "") {
      setIsOpen(false);
      const params = { ...getQueryParams(), search: e.target.value };
      navigate({
        search: `?${createSearchParams(params)}`,
      });
      delete params.page;
      if (paramsId) {
        const id = paramsId;
        dispatch(action({ id, params: params }));
      } else {
        dispatch(action({ params: params }));
      }
    } else {
      removeParams("search", navigate);
      if (paramsId) {
        const id = paramsId;
        dispatch(action({ id, params: { ...getQueryParams() } }));
      } else {
        dispatch(action({ params: { ...getQueryParams() } }));
      }
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
  return (
    <TextInput
      sx={{ textAlign: "end" }}
      openwidth={openin}
      id="standard-basic"
      label="جستجو"
      variant="standard"
      // type="search"
      name="search"
      defaultValue={defaultQuery?.search}
      onInput={debouncedResults}
      width={width}
    />
  );
};
