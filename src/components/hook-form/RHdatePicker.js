import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import RHFTextField from "./RHFTextField";
import AdapterJalaali from "@date-io/jalaali";
import jMoment from "moment-jalaali";
// @mui

// ----------------------------------------------------------------------

export default function RHDatePicker({ name, children, ...other }) {
  const { control } = useFormContext();
  jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const datePickeronChange = (e) => {
          field.onChange(e);
          other.handleChange(e);
        };
        return (
          <LocalizationProvider
            fullWidth
            dateAdapter={AdapterJalaali}
            sx={{ width: "100%" }}
            
          >
            <DatePicker
            label={other.label}
              name={name}
              value={field.value}
              onChange={(newValue) => datePickeronChange(newValue)}
              renderInput={(params) => <RHFTextField {...params} name={name} />}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
}
