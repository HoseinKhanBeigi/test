import {
  RHFTextField,
  RHMultiSelect,
  RHSelectField,
  RHDatePicker,
  RHRadioGroup,
  RHAuto,
} from "../hook-form";
import Radio from "@mui/material/Radio";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Grid } from "@mui/material";

export const switchInput = (element, typeForm, status, statusDetail, t) => {
  switch (element.typeInput) {
    case "RHFTextField": {
      return (
        <RHFTextField
          name={element.name}
          label={t(`${element.label}`)}
          type={element.type}
          loading={statusDetail === "succeeded"}
          typeForm={typeForm}
          InputProps={{
            sx: {
              "& input": {
                textAlign: element.left && "end",
              },
            },
          }}
        />
      );
    }

    case "RHSelectField":
      return (
        <RHSelectField
          name={element.name}
          labelId="demo-simple-select-fullWidth-label"
          id="demo-simple-select-fullWidth-label"
          fullWidth
          loading={element.loadingCreate}
          typeForm={typeForm}
          label={t(`${element.label}`)}
          onChange={element.change}
        >
          {typeForm !== "create"
            ? element.async
              ? element.loadingEdit &&
                element.values?.map((e, i) => {
                  return (
                    <MenuItem value={e[element.propValue]} key={i} dir="rtl">
                      {e.name}
                    </MenuItem>
                  );
                })
              : element.values?.map((e, i) => {
                  return (
                    <MenuItem value={e[element.propValue]} key={i} dir="rtl">
                      {e.name}
                    </MenuItem>
                  );
                })
            : element.async
            ? element.loadingCreate &&
              element.values?.map((e, i) => {
                return (
                  <MenuItem value={e[element.propValue]} key={i} dir="rtl">
                    {e.name}
                  </MenuItem>
                );
              })
            : element.values?.map((e, i) => {
                return (
                  <MenuItem value={e[element.propValue]} key={i} dir="rtl">
                    {e.name}
                  </MenuItem>
                );
              })}
        </RHSelectField>
      );
    case "RHMultiSelect":
      return (
        <RHMultiSelect
          name={element.name}
          value={element.value}
          loading={element.loadingEdit}
          label={t(`${element.label}`)}
          handleChange={element.change}
          propTitle={element?.propTitle}
        >
          {typeForm !== "create"
            ? element.loadingEdit &&
              element.values?.map((e, i) => {
                return (
                  <MenuItem
                  dir="rtl"
                    value={e}
                    key={i}
                    sx={{
                      backgroundColor: element.value?.some(
                        (k) => k[element.propTitle] === e[element.propTitle]
                      )
                        ? "rgba(1, 120, 116, 0.08)"
                        : "",
                    }}
                  >
                    {e[element.propTitle]}
                  </MenuItem>
                );
              })
            : status === "succeeded" &&
              element.loadingCreate &&
              element.values?.map((e, i) => {
                return (
                  <MenuItem dir="rtl" value={e} key={i}>
                    {e[element.propTitle]}
                  </MenuItem>
                );
              })}
        </RHMultiSelect>
      );

    case "RHDatePicker":
      return (
        <RHDatePicker
          label={t(`${element.label}`)}
          name={element.name}
          handleChange={element.change}
        />
      );

    case "RHRadioGroup":
      return (
        <RHRadioGroup
          name={element.name}
          handleChange={element.change}
          loading={element.loading}
          typeForm={typeForm}
        >
          <Grid container>
            {element.values?.map((e, i) => {
              return (
                <FormControlLabel
                  key={i}
                  value={e.name}
                  control={<Radio />}
                  label={e.name}
                />
              );
            })}
          </Grid>
        </RHRadioGroup>
      );

    case "RHAuto":
      return (
        <RHAuto
          typeForm={typeForm}
          name={element.name}
          value={element.values}
          loadingEdit={element.loadingEdit}
          loadingCreate={element.loadingCreate}
          label={t(`${element.label}`)}
          handleChange={element.change}
          // onInputChange={element?.onInputChange}
          propTitle={element?.propTitle}
          defaultValue={element.value}
          multiple={element.multiple}
        />
      );
    default:
      break;
  }
};
