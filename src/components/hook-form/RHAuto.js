import { useFormContext, Controller } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import styles from "./CssModulesSlider.module.css";

import { useEffect, useState } from "react";

export default function RHAuto({ name, children, ...other }) {
  const { control } = useFormContext();
  const [iniSingleValue, setInitialSingleValue] = useState(() => {
    if (other.typeForm !== "create" && !other.multiple) {
      return other.defaultValue;
    }
  });
  const [changeState, setChangeState] = useState();

  const [multipleValue, setMultipleValue] = useState([]);

  useEffect(() => {
    if (!other.multiple && other.typeForm !== "create" && !changeState) {
      setInitialSingleValue(other.defaultValue);
    }
  }, [other.loadingEdit, other.typeForm, changeState]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ref }, fieldState: { error } }) => {
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
            setChangeState(value);
            other.handleChange(value);
            setInitialSingleValue(value);
            //
          }
        };
        return (
          <Autocomplete
            dir="rtl"
            classes={{
              option: styles.option,
            }}
            multiple={other.multiple}
            id={other.multiple ? "multiple-limit-tags" : "combo-box-demo"}
            options={
              other.loadingEdit || other.loadingCreate ? other.value : []
            }
            onChange={selectChange}
            getOptionLabel={(option) =>
              other.loadingEdit || other.loadingCreate
                ? option[other.propTitle] === undefined
                  ? ""
                  : option[other.propTitle]
                : ""
            }
            value={
              other.typeForm !== "create"
                ? other.multiple
                  ? other.loadingEdit && other.defaultValue
                  : other.loadingEdit && iniSingleValue
                : other.multiple
                ? multipleValue
                : undefined
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
