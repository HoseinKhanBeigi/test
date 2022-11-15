import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider,bgBG } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";



// import { CalendarPicker, LocalizationProvider,  } from '@mui/x-date-pickers';
import bgLocale from 'date-fns/locale/bg';

export function CustomizeDayPicker() {
  const [value, setValue] = React.useState(dayjs("2022-04-07"));

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={bgLocale}
    //   localeText={
    //     bgBG.components.MuiLocalizationProvider.defaultProps.localeText
    //   }
    >
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
        dayOfWeekFormatter={(day) => `${day}.`}
        toolbarFormat="ddd DD MMMM"
        showToolbar
      />
    </LocalizationProvider>
  );
}
