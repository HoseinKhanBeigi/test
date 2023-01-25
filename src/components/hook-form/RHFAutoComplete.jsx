import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export function CheckboxesTags({
  data,
  statusClient,
  debouncedResultsClients,
  onChange
}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = statusClient !== "succeeded";
  const handleChangeAutoComplete = (e, value,reason,details) => {
    onChange(value);
  };

  React.useEffect(() => {
    if (statusClient === "succeeded") {
      setOptions([...data]);
    }
  }, [statusClient]);

  return (
    <>
      <Autocomplete
        multiple
        id="asynchronous-demo"
        options={options}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        loading={loading}
        getOptionLabel={(option) => option.name}
        onChange={handleChangeAutoComplete}
        renderOption={(props, option, { selected }) => (
          <Grid
            container
            flexDirection={"column"}
            dir="rtl"
            justifyContent="start"
          >
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.name}
            </li>
          </Grid>
        )}
        style={{ width: 500, display: "flex" }}
        renderInput={(params) => {
          return (
            <Grid container dir="rtl">
              <TextField
                {...params}
                label="جستجو"
                onInput={debouncedResultsClients}
                type="text"
                name="search"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                    </React.Fragment>
                  ),
                }}
              />
            </Grid>
          );
        }}
      />
    </>
  );
}
