import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { responseMessage } from "../../features/messageLog";
import { HeaderPage } from "../../components/headerPage";
import { userForm } from "./userForm";
import { LoginSchema } from "./schema";
import { switchInput } from "../../components/switchInputs";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import {
  userOrganization,
  userCreate,
  userUpdate,
  userDetail,
  usersList,
} from "../../actions/users";
import { dashboardApp } from "../../actions/profile";
import { FormProvider } from "../../components/hook-form";
import Notifier from "../../components/notify";

export const CreateUserSingle = ({ typeForm }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [interests, setIntersts] = React.useState([]);
  const { statusDetail, userDetails, organizationValue, errorDetial } =
    useSelector((state) => state.userDetailShow);

  const { status, entities, error } = useSelector(
    (state) => state.userOrganizationType
  );

  const defaultValues = {
    personnel_code: userDetails?.data?.user?.personnel_code,
    name: userDetails?.data?.user?.name,
    mobile: userDetails?.data?.user?.mobile,
    parent_id: userDetails?.data?.user?.parent_id,
    organization: userDetails?.data?.user?.organization,
    level: userDetails?.data?.user?.level,
    position: userDetails?.data?.user?.position,
    email: userDetails?.data?.user?.email,
    organization_id: organizationValue,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema(t)),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    const id = params.id;
    if (statusDetail === "idle" && typeForm === "edit") {
      dispatch(
        userDetail({
          id,
        })
      ).then((e) => {
        if (e.payload.status === 200) {
          dispatch(
            userOrganization({
              organization_type: e.payload?.data?.user?.organization,
            })
          );
        }
      });
    }
  }, [statusDetail, dispatch]);

  useEffect(() => {
    if (statusDetail === "succeeded" && typeForm === "edit") {
      setIntersts(userDetails?.data?.user?.interests);
    }
  }, [statusDetail, typeForm]);



  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleChangeOrganization = (e) => {
    dispatch(userOrganization({ organization_type: e.name }));
    methods.setValue("organization", e.name);
  };

  const handleChangeOrganizationType = (event) => {
    methods.setValue("organization_id", event.id);
  };

  const handleChangeUserPosition = (event) => {
    methods.setValue("level", event.name);
  };

  const handleChangeSenior = (event) => {
    methods.setValue("parent_id", event.id);
  };

  const handleChangeIntersted = (event) => {
    setIntersts(event);
    methods.setValue(
      "interests",
      event.map((e) => e.id)
    );
  };

  const onSubmit = (e) => {
    if (typeForm === "edit") {
      const res = e;
      dispatch(userUpdate({ id: params.id, res })).then((result) => {
        if (result.payload.status === 200) {
          dispatch(responseMessage(result.payload.message));
          dispatch(usersList({}));
          navigate("/users");
          dispatch(dashboardApp({}));
        }
      });
    } else if (typeForm === "create") {
      let result = "";
      for (var key in e) {
        if (!e[key]) {
          delete e[key];
        }
        result = e;
      }

      dispatch(userCreate(result)).then((res) => {
        if (res.payload.status === 200) {
          dispatch(responseMessage(res.payload.message));
          dispatch(usersList({}));
          navigate("/users");
        }
      });
    }
  };

  useEffect(() => {
    const defaultValues = {
      personnel_code: userDetails?.data?.user?.personnel_code,
      name: userDetails?.data?.user?.name,
      mobile: userDetails?.data?.user?.mobile,
      parent_id: userDetails?.data?.user?.parent_id,
      organization: userDetails?.data?.user?.organization,
      level: userDetails?.data?.user?.level,
      position: userDetails?.data?.user?.position,
      email: userDetails?.data?.user?.email,
      organization_id: organizationValue,
    };
    if (typeForm === "edit") {
      methods.reset({ ...defaultValues });
    }
  }, [statusDetail, typeForm]);

  useEffect(() => {
    const defaultValues = {
      personnel_code: "",
      name: "",
      mobile: "",
      parent_id: "",
      organization: "",
      level: "",
      position: "",
      email: "",
      organization_id: "",
      interests: [],
    };
    if (typeForm === "create") {
      methods.reset({ ...defaultValues });
    }
  }, [typeForm]);

  const structForm = userForm(
    handleChangeOrganization,
    handleChangeOrganizationType,
    handleChangeIntersted,
    handleChangeUserPosition,
    handleChangeSenior,
    statusDetail,
    status,
    entities,
    interests,
    userDetails,
    organizationValue
  );


  return (
    <>
      <HeaderPage title={t("insertUser")} page="form" tab={false} />
      <Grid container>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6} dir="rtl">
            {structForm.map((element, idx) => (
              <Grid item xl={6} md={6} sm={6} key={idx}>
                {switchInput(element, typeForm, status, statusDetail, t)}
              </Grid>
            ))}

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
          </Grid>
        </FormProvider>
        <Notifier />
      </Grid>
    </>
  );
};
