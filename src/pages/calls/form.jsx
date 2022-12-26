import React, { useEffect, useState, useRef } from "react";
import {
  FormProvider,
  RHFTextField,
  RHSelectField,
  RHMultiSelect,
  RHFCheckbox,
} from "../../components/hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputLabel from "@mui/material/InputLabel";
// @mui
import { Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import IconButton from "@mui/material/IconButton";
import { UploadIcon } from "../../components/icons";
import AdapterJalaali from "@date-io/jalaali";
import JalaliUtils from "@date-io/jalaali";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { HeaderPage } from "../../components/headerPage";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTranslation } from "react-i18next";
import Notifier from "../../components/notify";
import { callForm } from "./callsForm";
import MenuItem from "@mui/material/MenuItem";
import { switchInput } from "../../components/switchInputs";
import {
  callsDepen,
  callsCreate,
  callsDepenAgent,
  callsDetail,
  callsUpdate,
} from "../../actions/calls";
import dayjs from "dayjs";
import jMoment from "moment-jalaali";
import moment from "moment";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useDispatch, useSelector } from "react-redux";
import { responseMessage } from "../../features/messageLog";
import { Typography } from "@mui/material";
export const FormCall = ({ typeForm }) => {
  const params = useParams();

  useEffect(() => {
    const id = params.id;
    if (typeForm === "edit") {
      dispatch(callsDetail({ id }));
    }
  }, []);

  const { statusDetail, callDetails, errorDetial } = useSelector(
    (state) => state.callDetailShow
  );

  const defaultValues = {
    topic: callDetails?.data?.topic,
    client_id: callDetails?.data?.client_id,
    user_id: callDetails?.data?.user_id,
    description: callDetails?.data?.description,
    location: callDetails?.data?.location,
    agent_id: callDetails?.data?.agent_id,
  };
  const { t, i18n } = useTranslation();
  const methods = useForm({
    // resolver: yupResolver(clientSchema),
    defaultValues:
      typeForm === "edit" ? statusDetail === "succeeded" && defaultValues : {},
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    register,
  } = methods;
  const navigate = useNavigate();

  const agent_id = methods.watch("agent_id");
  const client_id = methods.watch("client_id");
  const guest_id = methods.watch("guest_id");

  const [datePickerValue, setDatePicker] = React.useState();
  const [valueTime, setValueTime] = React.useState();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(callsDepen({}));
  }, []);

  const { status, entities, error } = useSelector((state) => state.callDepen);
  const { statuscallAgents, callAgents, errorcallAgents } = useSelector(
    (state) => state.callAgentsDepen
  );

  const handleChangeTimePickerStart = (e) => {
    console.log(moment(e).locale("en").format("YYYY-MM-DD HH:mm:ss"));
    // setValueTime(dayjs(e).locale("en").format());
    setDatePicker(dayjs(e).locale("en").format());
    methods.setValue(
      "start",
      moment(e).locale("en").format("YYYY-MM-DD HH:mm:ss")
    );
  };

  const handleChangeTimePicker = (e) => {
    setValueTime(dayjs(e).locale("en").format());
    methods.setValue(
      "end",
      moment(e).locale("en").format("YYYY-MM-DD HH:mm:ss")
    );
  };

  const handleChangeAgentId = (e) => {
    methods.setValue("agent_id", e.id);
  };
  const handleChangeClientId = (e) => {
    console.log(e);
    const id = e.id;
    dispatch(callsDepenAgent({ id }));
    methods.setValue("client_id", e.id);
  };

  useEffect(() => {
    if (statusDetail === "succeeded" && typeForm === "edit") {
      const id = callDetails?.data?.agent_id;
      console.log(id);
      dispatch(callsDepenAgent({ id }));
    }
  }, [statusDetail, typeForm]);

  const onSubmit = (e) => {
    if (typeForm === "edit") {
      const res = e;
      console.log(res, "asdad");
      if (res.agent_id) {
        delete res.client_id;
      } else if (!res.agent_id && res.client_id) {
        delete res.agent_id;
      }
      dispatch(callsUpdate({ id: params.id, res })).then((result) => {
        if (result.payload.status === 200) {
          dispatch(responseMessage(result.payload.message));
          navigate("/interactions/calls");
        }
      });
    } else if (typeForm === "create") {
      let result = "";
      console.log(e, "asdad");
      for (var key in e) {
        if (e[key] === "") {
          delete e[key];
        }
        result = e;
      }
      if (result.agent_id) {
        delete result.client_id;
      } else if (!result.agent_id && result.client_id) {
        delete result.agent_id;
      }
      dispatch(callsCreate(result)).then((res) => {
        if (res.payload.status === 200) {
          dispatch(responseMessage(res.payload.message));
          navigate("/interactions/calls");
        }
      });
    }
  };
  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.click();
  };

  const [file, setFile] = useState();

  const handleClickInput = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (statusDetail === "succeeded" && typeForm === "edit") {
      const valuedefalts = {
        topic: callDetails?.data?.topic,
        client_id: callDetails?.data?.client_id,
        user_id: callDetails?.data?.user_id,
        description: callDetails?.data?.description,
        location: callDetails?.data?.location,
        agent_id: callDetails?.data?.agent_id,
      };
      methods.reset({ ...valuedefalts });
    }
  }, [statusDetail]);

  useEffect(() => {
    if (
      statusDetail === "succeeded" &&
      statuscallAgents === "succeeded" &&
      typeForm === "edit"
    ) {
      console.log(callAgents);
    }
  }, [statuscallAgents]);

  useEffect(() => {
    const defaultValues = {
      topic: "",
      agent_id: "",
      client_id: "",
      user_id: "",
      description: "",
    };
    if (typeForm === "create") {
      methods.reset({ ...defaultValues });
    }
  }, [typeForm]);

  const structForm = callForm(
    statusDetail,
    status,
    entities,
    handleChangeClientId,
    handleChangeAgentId,
    statuscallAgents,
    callAgents,
    callDetails
  );

  return (
    <>
      <HeaderPage title={t("insertcall")} page="form" tab={false} />
      <Grid container dir="rtl">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {structForm.map((element, idx) => (
              <Grid item xl={6} md={6} sm={6} key={idx}>
                {switchInput(element, typeForm, status, statusDetail, t)}
              </Grid>
            ))}

            <Grid container item xl={6} md={6} sm={6} spacing={1}>
              <Grid item sm={6}>
                <LocalizationProvider
                  fullWidth
                  dateAdapter={AdapterJalaali}
                  sx={{ width: "100%" }}
                >
                  <TimePicker
                    name={"start"}
                    label={t("dateAndTime")}
                    value={datePickerValue}
                    onChange={(newValue) => handleChangeTimePickerStart(newValue)}
                    renderInput={(params) => (
                      <RHFTextField {...params} name="start" />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item sm={6}>
                <LocalizationProvider dateAdapter={AdapterJalaali}>
                  <TimePicker
                    name={"end"}
                    label={t("endTime")}
                    value={valueTime}
                    onChange={(newValue) => handleChangeTimePicker(newValue)}
                    renderInput={(params) => (
                      <RHFTextField {...params} name="end" />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            mt={2}
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Typography>{t("Description")}</Typography>
            {/* <IconButton
              sx={{ p: "10px" }}
              aria-label="menu"
              onClick={handleClick}
            >
              <UploadIcon />

              <input
                hidden
                name="file"
                ref={inputRef}
                type="file"
                onChange={handleClickInput}
              />
              <Typography> {file?.name}</Typography>
            </IconButton> */}
          </Grid>
          <Grid container>
            <RHFTextField
              name="description"
              label={t("Description")}
              placeholder={t("Description")}
              multiline
              typeForm="create"
              // loading={statusDetail === "succeeded"}
              rows={5}
            />
          </Grid>
          <Grid container justifyContent={"end"} item mt={2}>
            <LoadingButton
              size="small"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{ width: "200px" }}
            >
              {typeForm !== "edit" ? t("insert") : t("update")}
            </LoadingButton>
          </Grid>
        </FormProvider>
        <Notifier />
      </Grid>
    </>
  );
};
