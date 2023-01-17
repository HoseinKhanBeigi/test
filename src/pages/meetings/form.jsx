import React, { useEffect, useState, useRef } from "react";
import { FormProvider, RHFTextField } from "../../components/hook-form";
import IconButton from "@mui/material/IconButton";
import { UploadIcon } from "../../components/icons";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid} from "@mui/material";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { HeaderPage } from "../../components/headerPage";
import Notifier from "../../components/notify";
import { useNavigate, useParams } from "react-router-dom";
import { switchInput } from "../../components/switchInputs";
import {
  meetingDependencies,
  meetingsCreate,
  MeetingsDepenAgent,
  meetingDetail,
  meetingUpdate,
  meetingsList
} from "../../actions/meetings";
import { meetingForm, meetingFormDate } from "./meetingForm";
import { responseMessage } from "../../features/messageLog";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { meetingSchema } from "./meetingSchema";
import { Typography } from "@mui/material";
export const FormMeeting = ({ typeForm }) => {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [datePickerValue, setDatePicker] = React.useState();
  const [valueTime, setValueTime] = React.useState();


  const { statusDetail, meetingDetails, errorDetial } = useSelector(
    (state) => state.meetingDetailShow
  );
  const { statusMeetingEntities, meetingEntities, errorMeetingEntities } =
    useSelector((state) => state.meetingDependenciesSlice);

  const { statusMeetingAgents, MeetingAgents, errorMeetingAgents } =
    useSelector((state) => state.MeetingAgentsDepen);

  const defaultValues = {
    topic: meetingDetails?.data?.topic,
    client_id: meetingDetails?.data?.client_id,
    user_id: meetingDetails?.data?.user_id,
    description: meetingDetails?.data?.description,
    location: meetingDetails?.data?.location,
    guest: meetingDetails?.data?.guest,
    users: meetingDetails?.data?.users,
  };

  const methods = useForm({
    resolver: yupResolver(meetingSchema(t)),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    const id = params.id;
    if (statusDetail === "idle" && typeForm === "edit") {
      dispatch(meetingDetail({ id })).then((e) => {
        if (e.payload.status === 200) {
          dispatch(MeetingsDepenAgent({ id: e.payload.data.client_id })).then(
            () => {
              dispatch(meetingDependencies({}));
            }
          );
        }
      });
    }
  }, [statusDetail, dispatch]);

  const handleChangeDatePicker = (e) => {
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
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    const attach = e.target.files[0];
    methods.setValue("attach", chosenFiles);
    setFile(chosenFiles);
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
  const [agents, setAgents] = React.useState([]);

  const handleChangeAgentId = (event) => {
    setAgents(event);
    methods.setValue(
      "agents",
      event.map((e) => e.id)
    );
  };

  useEffect(() => {
    if (statusDetail === "succeeded" && typeForm === "edit") {
      setUsers(meetingDetails?.data?.users);
      setDatePicker(dayjs(meetingDetails?.data?.start).locale("en").format());
      setValueTime(dayjs(meetingDetails?.data?.end).locale("en").format());

      setAgents(meetingDetails?.data?.agents);
    } else if (typeForm === "create") {
      setUsers([]);
      setAgents([]);
    }
  }, [statusDetail, typeForm]);

  const handleChangeSetUsers = (event) => {
    setUsers(event);
    methods.setValue(
      "users",
      event.map((e) => e.id)
    );
  };

  const onSubmit = (e) => {
    if (typeForm === "edit") {
      const res = e;
      dispatch(meetingUpdate({ id: params.id, res })).then((result) => {
        if (result.payload.status === 200) {
          dispatch(responseMessage(result.payload.message));
          dispatch(meetingsList({}));
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
          dispatch(meetingsList({}));
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
      start:"",
      end:"",
      attach: [],
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
    handleChangeSetUsers,
    users,
    agents,
    MeetingAgents,
    statusDetail,
    meetingDetails,
    meetingEntities,
    statusMeetingEntities,
  );

  const structFormDate = meetingFormDate(
    datePickerValue,
    handleChangeDatePicker,
    valueTime,
    handleChangeEndTimePicker
  );
  return (
    <>
      <HeaderPage title={t("insertMeeting")} page="form" tab={false} />
      <Grid container dir="rtl">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {structForm.map((element, idx) => (
              <Grid item xl={6} md={6} sm={6} key={idx}>
                {switchInput(
                  element,
                  typeForm,
                  statusMeetingAgents,
                  statusDetail,
                  t
                )}
              </Grid>
            ))}
            <Grid container item xl={6} md={6} sm={6} spacing={1}>
              {structFormDate.map((element, idx) => (
                <Grid item sm={6} key={idx}>
                  {switchInput(
                    element,
                    typeForm,
                    statusMeetingAgents,
                    statusDetail,
                    t
                  )}
                </Grid>
              ))}
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
              {file?.map((e) => (
                <Typography> {e?.name}</Typography>
              ))}
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
