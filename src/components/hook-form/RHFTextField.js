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

const te = "\ "

const lang = [
  { a: "ش" },
  { A: "ش" },
  { b: "ذ" },
  { B: "ذ" },
  { c: "ز" },
  { C: "ز" },
  { d: "ی" },
  { D: "ی" },
  { e: "ث" },
  { E: "ث" },
  { f: "ب" },
  { F: "ب" },
  { g: "ل" },
  { G: "ل" },
  { h: "ا" },
  { H: "آ" },
  { i: "ه" },
  { I: "ه" },
  { j: "ت" },
  { J: "ت" },
  { k: "ن" },
  { K: "ن" },
  { l: "م" },
  { L: "م" },
  { m: "ء" },
  { M: "ئ" },
  { n: "د" },
  { N: "د" },
  { o: "خ" },
  { O: "خ" },
  { p: "ح" },
  { P: "ح" },
  { q: "ض" },
  { Q: "ض" },
  { r: "ق" },
  { R: "ق" },
  { s: "س" },
  { S: "س" },
  { t: "ف" },
  { T: "ف" },
  { u: "ع" },
  { U: "ع" },
  { v: "ر" },
  { V: "ر" },
  { w: "ص" },
  { W: "ص" },
  { x: "ط" },
  { X: "ط" },
  { y: "غ" },
  { Y: "غ" },
  { z: "ظ" },
  { Z: "ظ" },
  {" \ ":"پ"},
  { "|": "پ" },
  { "]": "چ" },
  { "[": "ج" },
  { "'": "گ" },
  { ";": "ک" },
  { ",": "و" },
  { " ": " " },
  { ا: "ا" },
  { آ: "آ" },
  { ض: "ض" },
  { م: "م" },
  { ص: "ص" },
  { ث: "ث" },
  { ق: "ق" },
  { ف: "ف" },
  { غ: "غ" },
  { ع: "ع" },
  { ه: "ه" },
  { خ: "خ" },
  { ح: "ح" },
  { ج: "ج" },
  { چ: "چ" },
  { ش: "ش" },
  { س: "س" },
  { ی: "ی" },
  { ب: "ب" },
  { ل: "ل" },
  { ت: "ت" },
  { ن: "ن" },
  { ک: "ک" },
  { گ: "گ" },
  { پ: "پ" },
  { ظ: "ظ" },
  { ط: "ط" },
  { ز: "ز" },
  { ر: "ر" },
  { ذ: "ذ" },
  { د: "د" },
  { ئ: "ئ" },
  { ء: "ء" },
  { و: "و" },
  { ".": "." },
  { ",": "," },
];

export default function RHFTextField({ name, ...other }) {
  const { control } = useFormContext();
  const refInput = useRef();

  const letterTranslate = (letters) => {
    let result = [];
    for (let k = 0; k < letters.length; k++) {
      const resultLetter = lang.find((e) => e[letters[k]]);
      if (k === 0) {
        result.push(resultLetter[letters[k]]);
      } else {
        result.push(resultLetter[letters[k]]);
      }
    }

    return result;
  };
  const handleInput = (e) => {
    const res = letterTranslate(e.target.value);
    let value = res.join("");
    refInput.current.value = value;
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
            error={!!error}
            onInput={other.farsi&& handleInput}
            helperText={error?.message}
            inputRef={refInput}
            {...other}
          />
        );
      }}
    />
  );
}
