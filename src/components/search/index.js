import { styled, useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useEffect, useMemo } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQueryParams } from "../../utils";
import { debounce } from "lodash";

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
export const SearchInput = ({ defaultQuery, action, removeParams ,openin}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChangeSearch = (e) => {
    if (e.target.value !== "") {
      const params = { ...getQueryParams(), search: e.target.value };
      navigate({
        search: `?${createSearchParams(params)}`,
      });
      delete params.page;
      dispatch(action({ params: params }));
    } else {
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
  return (
    <TextInput
      openwidth={openin}
      id="standard-basic"
      label="جستجو"
      variant="standard"
      type="search"
      name="search"
      defaultValue={defaultQuery?.search}
      onInput={debouncedResults}
    />
  );
};
