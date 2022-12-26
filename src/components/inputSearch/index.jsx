import TextField from "@mui/material/TextField";
import { debounce } from "lodash";
import React, { useEffect, useRef, useState, useMemo } from "react";
export const InputSearch = ({ props,handleChangeSearch }) => {
  const debouncedResults = useMemo(() => {
    return debounce(handleChangeSearch, 500);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });
  return <TextField {...props} onInput={debouncedResults} />;
};
