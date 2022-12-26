import { Grid } from "@mui/material";
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";



import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useRef, useState } from "react";
import Button from "@mui/material/Button";
import {
  Filled,
  SeenMessage,
  AllMessage,
  PhoneIcon,
  PhoneOption,
  UploadIcon,
  SendIcon,
} from "../../components/icons";
export const Accessiblities = () => {
  const [currentSelect, setCurrentSelect] = useState([
    { state: false, name: "all" },
    { state: false, name: "all2" },
    { state: false, name: "all3" },
    { state: false, name: "all4" },
    { state: false, name: "all5" },
    { state: false, name: "all6" },
  ]);
  const handleClick = (event) => {
    const newState = currentSelect.map((e) => {
      if (e.name === event.currentTarget.getAttribute("data-name")) {
        return {
          ...e,
          state: true,
        };
      } else {
        return {
          ...e,
          state: false,
        };
      }
    });

    setCurrentSelect(newState);
  };
  const { t, i18n } = useTranslation();
  return (
    <>
        <Grid
          container
          dir="rtl"
          justifyContent="end"
          alignItems="center"
          mb={2}
          mt={5}
        >
          <Grid container sx={{ width: "90%" }} justifyContent="space-around">
            <Typography color={"#017874"}>{"بازاریاب"}</Typography>
            <Typography color={"#017874"}>{"بازاریاب ارشد"}</Typography>
            <Typography color={"#017874"}>{"ستادی"}</Typography>
            <Typography color={"#017874"}>{"ستادی ارشد"}</Typography>
            <Typography color={"#017874"}>{"مشتری"}</Typography>
          </Grid>
        </Grid>
        {[
          "پیامک",
          "درج بازاریاب",
          "تعاملات",
          "یادداشت ها",
          "درج مشتری",
          "پروفایل",
          "گزارش خود",
          "گزارش مشتریان",
          "لیست مشتریان خود",
          "لیست مشتریانان",
        ].map((name,i)=>{
            return(
                <Grid
                key={i}
                container
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography>{name}</Typography>
                <Grid container sx={{ width: "90%" }} justifyContent="space-around">
                  <FormControlLabel control={<Switch defaultChecked />} />
                  <FormControlLabel control={<Switch defaultChecked />} />
                  <FormControlLabel control={<Switch defaultChecked />} />
                  <FormControlLabel control={<Switch defaultChecked />} />
                  <FormControlLabel control={<Switch defaultChecked />} />
                </Grid>
              </Grid>
            )
        })}
    </>
  );
};
