import React, { useEffect, useState, useRef } from "react";
import {
  FormProvider,
  RHFTextField,
  RHSelectField,
  RHMultiSelect,
  RHFCheckbox,
} from "../../components/hook-form";
import IconButton from "@mui/material/IconButton";
import { UploadIcon } from "../../components/icons";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { LoadingButton } from "@mui/lab";
import { Select } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Grid, Stack, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import AdapterJalaali from "@date-io/jalaali";
import JalaliUtils from "@date-io/jalaali";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { HeaderPage } from "../../components/headerPage";
import Notifier from "../../components/notify";
import { useNavigate, useParams } from "react-router-dom";
import { switchInput } from "../../components/switchInputs";
import {
  meetingsDepen,
  meetingsCreate,
  MeetingsDepenAgent,
  meetingDetail,
  meetingUpdate,
} from "../../actions/meetings";
import jMoment from "moment-jalaali";
import { meetingForm } from "./meetingForm";
import { responseMessage } from "../../features/messageLog";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { meetingSchema } from "./meetingSchema";
import { Typography } from "@mui/material";
export const FormMeeting = ({ typeForm }) => {
  const params = useParams();

  useEffect(() => {
    const id = params.id;
    if (typeForm === "edit") {
      dispatch(meetingDetail({ id }));
    }
  }, []);

  const { statusDetail, meetingDetails, errorDetial } = useSelector(
    (state) => state.meetingDetailShow
  );

  const defaultValues = {
    topic: meetingDetails?.data?.topic,
    client_id: meetingDetails?.data?.client_id,
    user_id: meetingDetails?.data?.user_id,
    description: meetingDetails?.data?.description,
    location: meetingDetails?.data?.location,
    guest: meetingDetails?.data?.guest,
  };
  const { t, i18n } = useTranslation();

  const { statusMeetingAgents, MeetingAgents, errorMeetingAgents } =
    useSelector((state) => state.MeetingAgentsDepen);
  const methods = useForm({
    resolver: yupResolver(meetingSchema(t)),
    defaultValues:
      typeForm === "edit"
        ? statusDetail === "succeeded" &&
          statusMeetingAgents === "succeeded" &&
          defaultValues
        : {},
  });
  const inputRef = useRef(null);
  jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(meetingsDepen({}));
  }, []);

  const { status, entities, error } = useSelector(
    (state) => state.meetingDepen
  );

  const [datePickerValue, setDatePicker] = React.useState();
  const [valueTime, setValueTime] = React.useState();

  const handleChangeDatePicker = (e) => {
    // setValueTime(dayjs(e).locale("en").format());
    setDatePicker(dayjs(e).locale("en").format());
    methods.setValue(
      "start",
      moment(e).locale("en").format("YYYY-MM-DD HH:mm:ss")
    );
  };

  const handleChangeEndTimePicker = (e) => {
    const endDate = dayjs(datePickerValue).locale("en").format("YYYY-MM-DD");
    const endTime = moment(e).locale("en").format("HH:mm:ss");
    setValueTime(dayjs(e).locale("en").format());
    methods.setValue("end", `${endDate} ${endTime}`);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const [file, setFile] = useState();

  const handleClickInput = (e) => {
    // const chosenFiles = Array.prototype.slice.call(e.target.files);
    const attach = e.target.files[0];
    methods.setValue("attach", attach);

    setFile(attach);
  };

  const handleChangeClientId = (e) => {
    const id = e.id;
    dispatch(MeetingsDepenAgent({ id }));
    methods.setValue("client_id", e.id);
  };

  const handleChangeUserId = (e) => {
    methods.setValue("user_id", e.id);
  };

  const [users, setUsers] = React.useState([]);
  const [guests, setGusets] = React.useState([]);
  const [agents, setAgents] = React.useState([]);
  const [client_idInit, setClientId] = React.useState();

  const handleChangeAgentId = (event) => {
    console.log(event.map((e) => e.id));
    setAgents(event);
    methods.setValue(
      "agents",
      event.map((e) => e.id)
    );
  };

  useEffect(() => {
    if (statusDetail === "succeeded" && typeForm === "edit") {
      const id = meetingDetails?.data?.client?.id;
      dispatch(MeetingsDepenAgent({ id }));
    }
  }, [statusDetail, typeForm]);

  useEffect(() => {
    if (statusDetail === "succeeded" && typeForm === "edit") {
      setUsers(meetingDetails?.data?.users);
      setGusets(meetingDetails?.data?.guests);
      setDatePicker(dayjs(meetingDetails?.data?.start).locale("en").format());
      setValueTime(dayjs(meetingDetails?.data?.end).locale("en").format());

      setAgents(meetingDetails?.data?.agents);
    } else if (typeForm === "create") {
      setUsers([]);
      setGusets([]);
      setAgents([]);
    }
  }, [statusDetail, typeForm]);

  useEffect(() => {
    if (
      statusDetail === "succeeded" &&
      typeForm === "edit" &&
      status === "succeeded"
    ) {
      const res = entities?.data?.clients.find(
        (e) => e.id === meetingDetails?.data?.client_id
      );
      setClientId(res);
    }
  }, [statusDetail, typeForm, status]);

  const handleChangeSetUsers = (event) => {
    setUsers(event);
    methods.setValue(
      "users",
      event.map((e) => e.id)
    );
  };

  const handleChangeGuests = (event) => {
    setGusets(event);
    methods.setValue(
      "guests",
      event.map((e) => e.id)
    );
  };
  const navigate = useNavigate();

  const onSubmit = (e) => {
    if (typeForm === "edit") {
      const res = e;
      dispatch(meetingUpdate({ id: params.id, res })).then((result) => {
        if (result.payload.status === 200) {
          dispatch(responseMessage(result.payload.message));
          navigate("/interactions/meetings");
        }
      });
    } else if (typeForm === "create") {
      let result = "";
      for (var key in e) {
        if (e[key] === "") {
          delete e[key];
        }
        result = e;
      }
      dispatch(meetingsCreate(result)).then((res) => {
        if (res.payload.status === 200) {
          dispatch(responseMessage(res.payload.message));
          navigate("/interactions/meetings");
        }
      });
    }
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
    register,
  } = methods;

  useEffect(() => {
    const valuedefalts = {
      topic: meetingDetails?.data?.topic,
      client_id: meetingDetails?.data?.client_id,
      user_id: meetingDetails?.data?.user_id,
      description: meetingDetails?.data?.description,
      location: meetingDetails?.data?.location,
      start: dayjs(meetingDetails?.data?.start)
        .locale("en")
        .format("YYYY-MM-DD HH:mm:ss"),
      end: dayjs(meetingDetails?.data?.end)
        .locale("en")
        .format("YYYY-MM-DD HH:mm:ss"),
      guest: meetingDetails?.data?.guest,
      // users:meetingDetails?.data?.users,
    };
    if (statusDetail === "succeeded" && typeForm === "edit") {
      methods.reset({ ...valuedefalts });
    }
  }, [statusDetail, typeForm]);

  useEffect(() => {
    const defaultValues = {
      topic: "",
      agents: [],
      client_id: "",
      guest: "",
      users: [],
      user_id: "",
      description: "",
      location: "",
      attach: '',
    };
    if (typeForm === "create") {
      methods.reset({ ...defaultValues });
    }
  }, [typeForm]);

  const structForm = meetingForm(
    handleChangeClientId,
    handleChangeAgentId,
    statusMeetingAgents,
    handleChangeUserId,
    handleChangeGuests,
    handleChangeSetUsers,
    guests,
    users,
    agents,
    client_idInit,
    MeetingAgents,
    statusDetail,
    meetingDetails,
    entities,
    status
  );
  return (
    <>
      <HeaderPage title={t("insertMeeting")} page="form" tab={false} />
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
                  <DateTimePicker
                    name={"start"}
                    label={t("dateAndTime")}
                    value={datePickerValue}
                    onChange={(newValue) => handleChangeDatePicker(newValue)}
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
                    onChange={(newValue) => handleChangeEndTimePicker(newValue)}
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
            <IconButton
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
                multiple
              />

              <Typography> {file?.name}</Typography>

              {/* {file?.map((e) => (
                <Typography> {e?.name}</Typography>
              ))} */}
            </IconButton>
          </Grid>
          <Grid container>
            <RHFTextField
              name="description"
              label={t("Description")}
              placeholder={t("Description")}
              loading={statusDetail === "succeeded"}
              typeForm="create"
              multiline
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
