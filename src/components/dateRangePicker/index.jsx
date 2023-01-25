import * as React from "react";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import AdapterJalaali from "@date-io/jalaali";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import jMoment from "moment-jalaali";
import moment from "moment";
import dayjs from "dayjs";
import { MobileDateRangePicker } from "@mui/x-date-pickers-pro/MobileDateRangePicker";
import { Grid } from "@mui/material";

export function CustomDateRangePickerDay({valueDate,setValue,onAccept}) {
  // const [value, setValue] = React.useState([null, null]);
  // jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

  // const onAccept = (item)=>{
  //   item.map((e) => {

  //   });
  // }

  return (
    <LocalizationProvider
      dateAdapter={AdapterJalaali}
      localeText={{ start: "شروع", end: "پایان" }}
    >
      <MobileDateRangePicker
        value={valueDate}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        onAccept={onAccept}
        renderInput={(startProps, endProps) => {
          delete { ...startProps.inputProps.placeholder };
          return (
            <React.Fragment>
              <Grid container rowGap={2}>
                <TextField
                  {...startProps}
                  inputProps={{
                    ...startProps.inputProps,
                    placeholder: "شروع",
                  }}
                />
                <TextField
                  {...endProps}
                  inputProps={{
                    ...endProps.inputProps,
                    placeholder: "پایان",
                  }}
                />
              </Grid>
            </React.Fragment>
          );
        }}
      />
    </LocalizationProvider>
  );
}
