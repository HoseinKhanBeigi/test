import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
// @mui
import { TextField } from "@mui/material";

// ----------------------------------------------------------------------

export default function RHRadioGroup({ name, children, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const radioGroupChange = (e) => {
          field.onChange(e);
          other.handleChange(e);
        };

        return (
          <FormControl>
            <RadioGroup
              {...field}
              onChange={radioGroupChange}
              value={
                (other.typeForm === "create" || other.loading) && field.value
              }
              aria-labelledby="demo-controlled-radio-buttons-group"
            >
              {children}
            </RadioGroup>
          </FormControl>
        );
      }}
    />
  );
}
