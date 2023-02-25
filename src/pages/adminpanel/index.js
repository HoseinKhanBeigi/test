import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate, Outlet, useLocation, useParams } from "react-router-dom";
import { permissionsUser } from "../../actions/admin";
import { HeaderPage } from "../../components/headerPage";
import { actionTabAdmin } from "../../features/tabs";

export const AdminPanel = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const [isEdit, setEdit] = useState(false);
  const [instructionTab, setInstructionTab] = useState(false);
  const [open, setOpen] = useState(false);
  // const { status, entities, error } = useSelector(
  //   (state) => state.userListSlice
  // );

  const { ButtonTabs } = useSelector((state) => state.tabSlice);
  const handleButtons = (e) => {
    navigate(`${e.name}`);
    dispatch(actionTabAdmin({ name: e.name }));
    if (e.name === "instructure") {
      setInstructionTab(true);
    } else {
      setInstructionTab(false);
    }
  };

  useEffect(() => {
    const path = location.pathname.slice(7);
    dispatch(actionTabAdmin({ name: path }));
    if (path === "instructure") {
      setInstructionTab(true);
    } else {
      setInstructionTab(false);
    }
  }, [location.pathname]);

  const createInstructions = () => {
    setOpen(true);
    setEdit(false);
  };

  const { entities, status } = useSelector(
    (state) => state.permissionUserSlice
  );

  return (
    <>
      <HeaderPage
        title={
          params.id
            ? t(`تغییر دسترسی ${entities?.data?.name}`)
            : t("adminpanel")
        }
        ButtonTabs={!params.id && ButtonTabs}
        handleButtons={handleButtons}
        instructionTab={instructionTab}
        createInstructions={createInstructions}
      />
      <Outlet context={[open, setOpen, isEdit, setEdit]} />
    </>
  );
};
