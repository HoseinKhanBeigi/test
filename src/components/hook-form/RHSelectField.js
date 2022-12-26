import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
import InputLabel from "@mui/material/InputLabel";
// @mui
import { Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

// ----------------------------------------------------------------------

RHSelectField.propTypes = {
  // name: PropTypes.string,
};

export default function RHSelectField({ name, children, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field, fieldState: { error } }) => {
        const selectChange = (e) => {
          if (other.loading) {
            field.onChange(e);
            other.handleChange(e);
          }
        };

        return (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-fullWidth-label">
              {other.label}
            </InputLabel>
            <Select
              {...field}
              labelId="demo-simple-select-fullWidth-label"
              id="demo-simple-select-fullWidth-label"
              label={other.label}
              value={
                (other.typeForm === "create" || other.loading) && field.value
              }
              onChange={selectChange}
              error={ other.typeForm === "create" ? !!error : other.loading && !!error}
              {...other}
            >
              {children}
            </Select>
            <FormHelperText>{error?.message}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );
}
