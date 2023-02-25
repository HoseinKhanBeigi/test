import React, { useEffect, useState, useRef } from "react";
import { FormProvider, RHFTextField } from "../../components/hook-form";
// @mui
import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import IconButton from "@mui/material/IconButton";
import { TrashIcone, UploadIcon } from "../../components/icons";
import { HeaderPage } from "../../components/headerPage";
import { useTranslation } from "react-i18next";
import Notifier from "../../components/notify";
import { callForm, callFormDate } from "./callsForm";
import { switchInput } from "../../components/switchInputs";
import {
  callsDepen,
  callsCreate,
  callsDepenAgent,
  callsDetail,
  callsUpdate,
  callsList,
} from "../../actions/calls";
import dayjs from "dayjs";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { responseMessage } from "../../features/messageLog";
import { Typography } from "@mui/material";
import { useDispatchAction } from "../../hooks/useDispatchAction";
export const FormCall = ({ typeForm }) => {
  const params = useParams();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [file, setFile] = useState();
  const [datePickerValue, setDatePicker] = React.useState("");
  const [valueTime, setValueTime] = React.useState("");

  const { statusDetail, callDetails } = useSelector(
    (state) => state.callDetailShow
  );
  const { status, entities } = useSelector((state) => state.callDepen);
  const { statuscallAgents, callAgents } = useSelector(
    (state) => state.callAgentsDepen
  );

  useEffect(() => {
    const id = params.id;
    if (statusDetail === "idle" && typeForm === "edit") {
      dispatch(callsDetail({ id })).then((e) => {
        if (e.payload.status === 200) {
          dispatch(
            callsDepenAgent({
              id: e.payload.data.client_id ?? e.payload.data.agent_id,
            })
          ).then(() => {
            dispatch(callsDepen({}));
          });
        }
      });
    }
  }, [statusDetail, dispatch]);

  useDispatchAction(callsDepen, status);

  const defaultValues = {
    topic: callDetails?.data?.topic,
    client_id: callDetails?.data?.client_id,
    user_id: callDetails?.data?.user_id,
    description: callDetails?.data?.description,
    location: callDetails?.data?.location,
    agent_id: callDetails?.data?.agent_id,
  };

  const methods = useForm({
    // resolver: yupResolver(clientSchema),
    defaultValues: defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleChangeTimePickerStart = (e) => {
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
    dispatch(callsDepenAgent({ id: e.id }));
    methods.setValue("client_id", e.id);
  };

  const onSubmit = (e) => {
    if (typeForm === "edit") {
      const res = e;
      if (res.agent_id) {
        delete res.client_id;
      } else if (!res.agent_id && res.client_id) {
        delete res.agent_id;
      }
      dispatch(callsUpdate({ id: params.id, res })).then((result) => {
        if (result.payload.status === 200) {
          dispatch(responseMessage(result.payload.message));
          dispatch(callsList({}));
          navigate("/interactions/calls");
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
      if (result.agent_id) {
        delete result.client_id;
      } else if (!result.agent_id && result.client_id) {
        delete result.agent_id;
      }
      dispatch(callsCreate(result)).then((res) => {
        if (res.payload.status === 200) {
          dispatch(callsList({}));
          dispatch(responseMessage(res.payload.message));
          navigate("/interactions/calls");
        }
      });
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleDeleteFile = (e)=>{
    const result =file.filter((j)=>j.name !== e.name)
    setFile(result);
  }


  const handleClickInput = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    methods.setValue("attach", chosenFiles);
    setFile(chosenFiles);
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
    const defaultValues = {
      topic: "",
      agent_id: "",
      client_id: "",
      user_id: "",
      description: "",
      attach: [],
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

  const structFormDate = callFormDate(
    datePickerValue,
    handleChangeTimePickerStart,
    valueTime,
    handleChangeTimePicker
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
              {structFormDate.map((element, idx) => (
                <Grid item sm={6} key={idx}>
                  {switchInput(element, typeForm, status, statusDetail, t)}
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
           
          </Grid>
          <Grid container>
            <RHFTextField
              name="description"
              label={t("Description")}
              placeholder={t("Description")}
              multiline
              typeForm="create"
              loading={statusDetail === "succeeded"}
              rows={5}
            />
          </Grid>
          {typeForm === "create" && (
            <Grid container flexDirection={"column"} alignItems="end">
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
              </IconButton>
              {file?.map((e) => (
                <Grid container justifyContent={"end"} alignItems="center">
                  <Typography> {e?.name}</Typography>
                  <IconButton
                    aria-label="menu"
                    onClick={() => handleDeleteFile(e)}
                  >
                    <TrashIcone />
                  </IconButton>
                </Grid>
              ))}
            </Grid>
          )}
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
