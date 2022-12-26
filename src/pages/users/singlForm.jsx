import React, { useCallback, useEffect, useRef, useState } from "react";
import { Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import { responseMessage } from "../../features/messageLog";
import { HeaderPage } from "../../components/headerPage";
import { userForm } from "./userForm";
import { LoginSchema } from "./schema";

import { switchInput } from "../../components/switchInputs";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { removeState } from "../../features/detailUser";
import {
  userOrganization,
  userCreate,
  userUpdate,
  userDetail,
} from "../../actions/users";
import { dashboardApp } from "../../actions/profile";
import { FormProvider } from "../../components/hook-form";
import Notifier from "../../components/notify";

export const CreateUserSingle = ({ typeForm }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [interstedName, setIntersted] = React.useState([]);
  const { statusDetail, userDetails, errorDetial } = useSelector(
    (state) => state.userDetailShow
  );
  useEffect(() => {
    const id = params.id;
    if (typeForm === "edit") {
      dispatch(userDetail({ id })).then((item) => {
        if (item.payload.status === 200) {
          dispatch(
            userOrganization({
              organization_type: item.payload.data.user.organization,
            })
          );
        }
      });
    }
  }, [params.id]);

  const { status, entities, error } = useSelector(
    (state) => state.userOrganizationType
  );

  useEffect(() => {
    if (typeForm === "edit" && statusDetail === "succeeded") {
      setIntersted(userDetails?.data?.user?.interests);
    } else {
      setIntersted([]);
    }
  }, [typeForm, statusDetail]);

  const organizationIds = (data) => {
    let value = "";
    if (data?.organization === "شعبه" || data?.organization === "سایر") {
      value = data?.branch_id;
    }
    if (data?.organization === "ستاد") {
      value = data?.head_quarter_department_id;
    }
    if (data?.organization === "شرکت های فرعی") {
      value = data?.company_id;
    }
    if (data?.organization === "نمایندگان") {
      value = data?.agency_id;
    }
    return value;
  };

  const defaultValues = {
    personnel_code: userDetails?.data?.user?.personnel_code,
    name: userDetails?.data?.user?.name,
    mobile: userDetails?.data?.user?.mobile,
    parent_id: userDetails?.data?.user?.parent_id,
    organization: userDetails?.data?.user?.organization,
    level: userDetails?.data?.user?.level,
    position: userDetails?.data?.user?.position,
    email: userDetails?.data?.user?.email,
    organization_id:
      status === "succeeded" &&
      statusDetail === "succeeded" &&
      organizationIds(userDetails?.data?.user),
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema(t)),
    defaultValues:
      typeForm === "edit"
        ? status === "succeeded" &&
          statusDetail === "succeeded" &&
          defaultValues
        : {},
  });

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
    setIntersted(event);
    methods.setValue(
      "interests",
      event.map((e) => e.id)
    );
  };

  const onSubmit = (e) => {
    if (typeForm === "edit") {
      const res = e;
      console.log(res);
      dispatch(userUpdate({ id: params.id, res })).then((result) => {
        if (result.payload.status === 200) {
          dispatch(responseMessage(result.payload.message));
          navigate("/users");
          dispatch(dashboardApp({}));
          dispatch(removeState());
        }
      });
    } else if (typeForm === "create") {
      let result = "";
      for (var key in e) {
        if (e[key] === "" || e[key] === null || e[key] === undefined) {
          delete e[key];
        }
        result = e;
      }

      dispatch(userCreate(result)).then((res) => {
        if (res.payload.status === 200) {
          dispatch(responseMessage(res.payload.message));
          dispatch(removeState());
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
      organization_id: organizationIds(userDetails?.data?.user),
    };
    if (statusDetail === "succeeded" && typeForm === "edit") {
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
    interstedName,
    userDetails
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
              {/* <Button sx={{ color: "#FF2020" }}>{t("remove")}</Button> */}
            </Grid>
          </Grid>
        </FormProvider>
        <Notifier />
      </Grid>
    </>
  );
};
