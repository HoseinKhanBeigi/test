import * as React from "react";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import AdapterJalaali from "@date-io/jalaali";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import jMoment from "moment-jalaali";
import moment from "moment";
import dayjs from "dayjs";
import { Grid } from "@mui/material";
import { RHFTextField } from "../hook-form";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Button from "@mui/material/Button";

export function CustomDateRangePickerDay({
  t,
  handleCancelDate,
  handleExecutionDate,
  setStartDate,
  startDate,
  setEndDate,
  endDate
}) {
  const handleChangeStart = (newValue) => {
    setStartDate(newValue);
  };
  const handleChangeEnd = (newValue) => {
    setEndDate(newValue);
  };

  return (
    <Grid container dir="rtl" rowGap={1}>
      <LocalizationProvider
        fullWidth
        dateAdapter={AdapterJalaali}
        sx={{ width: "100%" }}
      >
        <DatePicker
          label={t("start_date")}
          value={startDate}
          onChange={handleChangeStart}
          renderInput={(params) => (
            <TextField
              {...params}
              error={false}
              inputProps={{
                sx: {
                  "& input": {
                    textAlign: "right",
                  },
                },
                ...params.inputProps,
                placeholder: "",
              }}
            />
          )}
        />
        <DatePicker
          label={t("end_date")}
          value={endDate}
          onChange={handleChangeEnd}
          renderInput={(params) => (
            <TextField
              {...params}
              error={false}
              inputProps={{
                ...params.inputProps,
                placeholder: "",
                sx: {
                  "& input": {
                    textAlign: "left",
                  },
                },
              }}
            />
          )}
        />
      </LocalizationProvider>
      <Grid container justifyContent={"space-between"}>
        <Button sx={{ background: "#EFF3F3" }} onClick={handleCancelDate}>
          {t("cancel")}
        </Button>
        <Button
          sx={{ width: "85px" }}
          variant="contained"
          onClick={() => handleExecutionDate(startDate, endDate)}
        >
          {t("execution")}
        </Button>
      </Grid>
    </Grid>
  );
}
