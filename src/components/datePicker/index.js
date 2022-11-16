import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

import AdapterJalaali from "@date-io/jalaali";
import dayjs from "dayjs";
// import { CalendarPicker, LocalizationProvider,  } from '@mui/x-date-pickers';
import bgLocale from "date-fns/locale/bg";

const isWeekend = (date) => {
  const day = date.day();

  return day === 0 || day === 6;
};

export function CustomizeDayPicker() {
  const [value, setValue] = React.useState(dayjs("2022-04-07"));

  return (
    <LocalizationProvider dateAdapter={AdapterJalaali}>
      <StaticDatePicker
        orientation="landscape"
        openTo="day"
        value={value}
        shouldDisableDate={isWeekend}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
