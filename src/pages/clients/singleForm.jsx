import React, { useCallback, useEffect } from "react";
import { Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clientSchema } from "./schema";
import { AddAgents } from "./agents";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { responseMessage } from "../../features/messageLog";
import { HeaderPage } from "../../components/headerPage";
import { clientForm } from "./clientForm";
import {
  clientCreate,
  clientOrganization,
  clientUpdate,
  clientDetail,
  clientsList
} from "../../actions/clients";
import Notifier from "../../components/notify";
import { switchInput } from "../../components/switchInputs";
import "dayjs/locale/fa";
import { FormProvider } from "../../components/hook-form";
import moment from "moment";
import { useDispatchAction } from "../../hooks/useDispatchAction";

export const CreateClientSingle = ({ typeForm }) => {
  const { t } = useTranslation();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [genderRadio, setGenderRadio] = React.useState("مرد");
  const [interstedName, setIntersted] = React.useState([]);

  const { status, entities } = useSelector(
    (state) => state.clientOrganizationType
  );
  const { statusDetail, clientDetails } = useSelector(
    (state) => state.clientDetailShow
  );

  useEffect(() => {
    if (statusDetail === "idle") {
      dispatch(
        clientDetail({
          id: params.id,
        })
      ).then((e) => {
        if (e.payload.status === 200) {
          dispatch(clientOrganization({}));
        }
      });
    }
  }, [statusDetail, dispatch]);

  useDispatchAction(clientOrganization,status)

  const defaultValues = {
    name: clientDetails?.data?.client?.name,
    type: clientDetails?.data?.client?.type,
    email: clientDetails?.data?.client?.email,
    gender: clientDetails?.data?.client?.gender,
    national_number: clientDetails?.data?.client?.national_number,
    job: clientDetails?.data?.client?.job,
    phone: clientDetails?.data?.client?.phone,
    city: clientDetails?.data?.client?.city,
    user_id: clientDetails?.data?.client?.user_id,
    business: clientDetails?.data?.client?.business,
    agents: clientDetails?.data?.client?.agents,
  };

  const [valueRadio, setValueRadio] = React.useState(defaultValues.type);

  const methods = useForm({
    resolver: yupResolver(clientSchema(t)),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (statusDetail === "succeeded" && typeForm === "edit") {
      setIntersted(clientDetails?.data?.client?.interests);
      setValueRadio(clientDetails?.data?.client?.type);
    } else {
      setIntersted([]);
      setValueRadio();
    }
  }, [statusDetail, typeForm]);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleChangeDatePicker = (e) => {
    methods.setValue("birth_at", moment(e).locale("en").format("yyyy/MM/DD"));
  };

  const handleChangeBussiness = (e) => {
    methods.setValue("business", e.name);
  };

  const handleChangeUserId = (e) => {
    methods.setValue("user_id", e.target.value);
  };

  const handleChangeGender = (e) => {
    methods.setValue("gender", e.target.value);
    setGenderRadio(e.target.value);
  };

  const handleChangeClient = (event) => {
    methods.setValue("type", event.target.value);
    setValueRadio(event.target.value);
  };

  const handleChangeIntersted = (event) => {
    setIntersted(event);
    methods.setValue(
      "interests",
      event.map((e) => e.id)
    );
  };

  const onSubmit = (e) => {
    if (typeForm === "edit") {
      const result = e;
      dispatch(clientUpdate({ id: params.id, res: result })).then((result) => {
        if (result.payload.status === 200) {
          dispatch(clientsList({}))
          dispatch(responseMessage(result.payload.message));
          navigate("/clients");
        }
      });
    } else if (typeForm === "create") {
      let res = "";
      for (var key in e) {
        if (e[key] === "") {
          delete e[key];
        }
        res = e;
      }
      dispatch(clientCreate(res)).then((result) => {
        if (result.payload.status === 200) {
          dispatch(clientsList({}))
          dispatch(responseMessage(result.payload.message));
          navigate("/clients");
        }
      });
    }
  };

  const onChangeAgents = useCallback((e) => {
    const agents = e.map((k) => {
      return {
        name: k.agent_name || k?.name,
        phone: k.agent_phone || k?.phone,
        position: k.agent_position || k?.position,
      };
    });
    methods.setValue("agents", agents);
  }, []);

  useEffect(() => {
    if (statusDetail === "succeeded" && typeForm === "edit") {
      const valuedefalts = {
        name: clientDetails?.data?.client?.name,
        type: clientDetails?.data?.client?.type,
        email: clientDetails?.data?.client?.email,
        gender: clientDetails?.data?.client?.gender,
        national_number: clientDetails?.data?.client?.national_number,
        phone: clientDetails?.data?.client?.phone,
        job: clientDetails?.data?.client?.job,
        city: clientDetails?.data?.client?.city,
        user_id: clientDetails?.data?.client?.user_id,
        business: clientDetails?.data?.client?.business,
        agents: clientDetails?.data?.client?.agents,
      };
      methods.reset({ ...valuedefalts });
    }
  }, [statusDetail]);

  useEffect(() => {
    const defaultValues = {
      name: "",
      type: "",
      email: "",
      gender: "",
      national_number: "",
      phone: "",
      job: "",
      city: "",
      user_id: "",
      business: "",
      interests: [],
    };
    if (typeForm === "create") {
      methods.reset({ ...defaultValues });
    }
  }, [typeForm]);

  const structForm = clientForm(
    handleChangeClient,
    handleChangeGender,
    handleChangeDatePicker,
    handleChangeIntersted,
    handleChangeUserId,
    handleChangeBussiness,
    valueRadio,
    defaultValues.type,
    status,
    statusDetail,
    entities,
    interstedName,
    clientDetails
  );

  return (
    <>
      <HeaderPage title={t("insertClient")} page="form" tab={false} />
      <Grid container dir="rtl">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid container item spacing={2}>
              {structForm.map((element, idx) => (
                <Grid item xl={6} md={6} sm={6} key={idx}>
                  {switchInput(element, typeForm, status, statusDetail, t)}
                </Grid>
              ))}
            </Grid>
            <Grid item sx={{ width: "100%" }}>
              <AddAgents
                t={t}
                onChangeAgents={onChangeAgents}
                statusDetail={statusDetail}
                agentsList={clientDetails?.data?.client?.agents}
                typeForm={typeForm}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent={"end"} item>
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
