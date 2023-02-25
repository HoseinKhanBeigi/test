import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useLocation, useParams } from "react-router-dom";
import { useMemo } from "react";
export const SelectInput = ({
  hanldeChangeTypeSearch,
  setTypeSearch,
  typeSearch,
  t,
}) => {

  const location = useLocation()
  useMemo(() => {
    const res = location.pathname.slice(1);
    setTypeSearch(res);
  }, [location.pathname]);

  return (
    <FormControl
      sx={{ width: "120px", paddingRight: "12px" }}
      variant="standard"
    >
      <InputLabel id="demo-simple-select-label">{t("typeSearch")}</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={typeSearch}
        label="typeSearch"
        onChange={hanldeChangeTypeSearch}
      >
        <MenuItem value={"clients"}>{t("clients")}</MenuItem>
        <MenuItem value={"search"}>{t("agents")}</MenuItem>
      </Select>
    </FormControl>
  );
};
