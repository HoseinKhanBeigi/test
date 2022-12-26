import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { TextField } from "@mui/material";
import { useRef } from "react";

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
  name: PropTypes.string,
};

const lang = [
  { a: "ش" },
  { b: "ذ" },
  { c: "ز" },
  { d: "ی" },
  { e: "ث" },
  { f: "ب" },
  { g: "ل" },
  { h: "ا" },
  { i: "ه" },
  { j: "ت" },
  { k: "ن" },
  { l: "م" },
  { m: "ء" },
  { M: "ئ" },
  { n: "د" },
  { o: "خ" },
  { p: "ح" },
  { q: "ض" },
  { r: "ق" },
  { s: "س" },
  { t: "ف" },
  { u: "ع" },
  { v: "ر" },
  { w: "ص" },
  { x: "ط" },
  { y: "غ" },
  { z: "ظ" },
  { "|": "پ" },
  { "]": "چ" },
  { "[": "ج" },
  { "'": "گ" },
  { ";": "ک" },
  { ",": "و" },
  { " ": " " },
];

export default function RHFTextField({ name, ...other }) {
  const { control } = useFormContext();
  const refInput = useRef();

  const letterTranslate = (letters) => {
    let result = [];
    for (let k = 0; k < letters.length; k++) {
      const resultLetter = lang.find((e) => e[letters[k]]);
      if (result.length === 0) {
        result.push(resultLetter[letters[k]]);
      } else {
        result.push(resultLetter[letters[k]]);
      }
    }

    return result;

  };
  const handleInput = (e) => {
    const test=letterTranslate(e.target.value.slice(-1));
    console.log(test);
    // refInput.current.value = letter;
    
    // console.log(e.target.value);
    // for (let i in lang) {
    //   if (i === e.target.value.slice(-1)) {
    //     letter += lang[i];
    //     refInput.current.value = letter;
    //   }
    //   else if(letter.length > e.target.value.length){
    //     letter.slice(0, -1);
    //     // refInput.current.value = letter;
    //   }
    // }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            {...field}
            fullWidth
            value={
              typeof field.value === "number" && field.value === 0
                ? ""
                : other.loading ||
                  other.typeForm === "create" ||
                  other.typeFrom === "login"
                ? field.value
                : ""
            }
            error={
              other.typeForm === "create" ? !!error : other.loading && !!error
            }
            onInput={handleInput}
            helperText={error?.message}
            inputRef={refInput}
            {...other}
          />
        );
      }}
    />
  );
}
