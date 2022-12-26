import PropTypes from "prop-types";
import * as React from "react";
// form
import { useFormContext, Controller } from "react-hook-form";
import InputLabel from "@mui/material/InputLabel";
// @mui
import { Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

// ----------------------------------------------------------------------

RHMultiSelect.propTypes = {
  // name: PropTypes.string,
};

export default function RHMultiSelect({ name, children, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      // rules={{ required: true }}
      render={({ field: { onChange, ref }, fieldState: { error } }) => {
        const selectChange = (e, value) => {
          let val = "";
          const exist = other.value.some(
            (el) => el[other.propTitle] === value.props.value[other.propTitle] 
          );
          if (exist) {
            val = e.target.value.filter(
              (k) => k[other.propTitle] !== value.props.value[other.propTitle] 
            );
          } else {
            val = e.target.value;
          }
          other.handleChange(val);
        };

     
        

        return (
          <FormControl fullWidth error={error?.message}>
            <InputLabel id="demo-simple-select-fullWidth-label">
              {other.label}
            </InputLabel>
            <Select
              labelId="demo-simple-select-fullWidth-label"
              id="demo-simple-select-fullWidth-label"
              inputRef={ref}
              multiple
              label={other.label}
              value={other.value}
              error={error}
              onChange={selectChange}
              renderValue={(selected) => {
                return (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value, i) => (
                      <Chip key={i} label={value?.title || value?.name} />
                    ))}
                  </Box>
                );
              }}
            >
              {children}
            </Select>
          </FormControl>
        );
      }}
    />
  );
}
