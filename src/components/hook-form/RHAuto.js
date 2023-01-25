import { useFormContext, Controller } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import styles from "./CssModulesSlider.module.css";

import { useEffect, useRef, useState } from "react";

export default function RHAuto({ name, children, ...other }) {
  const { control } = useFormContext();
  const [iniSingleValue, setInitialSingleValue] = useState(() => {
    if (other.typeForm === "create" && !other.multiple) {
      return "";
    }
  });

  const changeState = useRef();

  const [multipleValue, setMultipleValue] = useState([]);

  useEffect(() => {
    if (!other.multiple && other.typeForm === "edit" && !changeState.current) {
      setInitialSingleValue(other.defaultValue);
    }
  }, [other.loadingEdit, other.typeForm, changeState.current]);

  
  useEffect(() => {
  if (other.typeForm === "create" && !other.multiple) {
      setInitialSingleValue("");
    }
  }, [other.typeForm]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const selectChange = (e, value, reason, details) => {
          if (other.multiple) {
            const exist =
              other?.typeForm !== "create" &&
              other?.defaultValue?.some(
                (el) => el[other.propTitle] === details?.option[other.propTitle]
              );
            if (exist) {
              const existItem = value.filter(
                (k) => k[other.propTitle] !== details?.option[other.propTitle]
              );
              other.handleChange(existItem);
            } else {
              other.handleChange(value);

              setMultipleValue((state) => [...value]);
            }
          } else {
            other.handleChange(value);

            setInitialSingleValue(value);
            changeState.current = value;
          }
        };

        return (
          <Autocomplete
            dir="rtl"
            classes={{
              option: styles.option,
            }}
            fullWidth
            multiple={other.multiple}
            id={other.multiple ? "multiple-limit-tags" : "combo-box-demo"}
            options={other.value}
            onChange={selectChange}
            getOptionLabel={(option) =>
              other.loadingEdit || other.loadingCreate
                ? option[other.propTitle] === undefined
                  ? ""
                  : option[other.propTitle]
                : ""
            }
            value={
              other.typeForm === "edit"
                ? other.multiple
                  ? other.loadingEdit && other?.defaultValue
                  : other.loadingEdit && iniSingleValue
                : other.multiple
                ? multipleValue
                : iniSingleValue
            }
            loading={!other.loadingEdit}
            renderInput={(params) => (
              <TextField {...params} label={other.label} sx={{}} />
            )}
          />
        );
      }}
    ></Controller>
  );
}
