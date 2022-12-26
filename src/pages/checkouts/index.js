import * as React from "react";
import { Link } from "react-router-dom";
import { Line } from "../../components/charts";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  FormProvider,
  RHFTextField,
  RHFCheckbox,
} from "../../components/hook-form";
import { useTheme } from "@mui/material/styles";

import {
  Curve,
  Clients,
  Flash,
  Frame1325,
  Frame1326,
  RectTangle1,
  RectTangle2,
  UserIconTitle,
  PlusIcon,
  OptionIcone,
  RemoveCalender
} from "../../components/icons";
import { Typography } from "@mui/material";

export const Checkouts = ()=>{
    const { t, i18n } = useTranslation();

    const theme = useTheme();
    const defaultValues = {
      username: "",
      password: "",
    };
  
    const LoginSchema = Yup.object().shape({
      username: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
    });
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const methods = useForm({
      resolver: yupResolver(LoginSchema),
      defaultValues,
    });
  
    const {
      handleSubmit,
      formState: { isSubmitting },
    } = methods;
  
    const onSubmit = async (e) => {
      // dispatch(userLogin(e))
      // navigate("/");
    };
    const [organization, setorganization] = React.useState("");
    const [position, setposition] = React.useState("");
    const [userPosition, setUserPosition] = React.useState("");
  
    const handleChangeOrganization = (event) => {
      setorganization(event.target.value);
    };
  
    const handleChangePostion = (event) => {
      setposition(event.target.value);
    };
  
    const handleChangeUserPosition = (event) => {
      setUserPosition(event.target.value);
    };
  
    const [value, setValue] = React.useState(t("real"));
  
    const handleChangeClient = (event) => {
      setValue(event.target.value);
    };
  
    return(
        <>
        <Grid
        container
        flexDirection={"column"}
        justifyContent="end"
        alignItems={"end"}
      >
        <Grid item mb={2}>
          <Typography className="title">{t("checkout")}</Typography>
        </Grid>
      </Grid>
         <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
         <Grid container spacing={14} dir="rtl" justifyContent={"center"}>
       
       

 
 
        

 
           <Grid container item alignContent={"center"} flexDirection="column">
             <Typography>{t("typeofcheckout")}</Typography>
             <FormControl sx={{ width: '50%' }}>
               <InputLabel id="demo-simple-select-fullWidth-label">
               {"لطفا نوع استعلام خود را انتخاب کنید"}
               </InputLabel>
 
               <Select
                 labelId="demo-simple-select-fullWidth-label"
                 id="demo-simple-select-fullWidth-label"
                 fullWidth
                 // value={age}
                 label={"لطفا نوع استعلام خود را انتخاب کنید"}
                 // onChange={handleChange}
               >
                 <MenuItem value={10}>Ten</MenuItem>
                 <MenuItem value={20}>Twenty</MenuItem>
                 <MenuItem value={30}>Thirty</MenuItem>
               </Select>
             </FormControl>
           </Grid>
           <Grid container item alignContent={"center"} flexDirection="column">
             <Typography>{"ورود اطلاعات"}</Typography>
             <RHFTextField name="name" label={""} sx={{ width: '50%' }} />
           </Grid>
           <Grid item container justifyContent={"center"} >
             <LoadingButton
             sx={{ width: '50%' }}
               size="big"
               type="submit"
               variant="contained"
               loading={isSubmitting}
               
             >
               {t("insert")}
             </LoadingButton>
         
           </Grid>
         </Grid>
       </FormProvider>
       </>
    )
}