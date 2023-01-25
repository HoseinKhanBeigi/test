import Notifier from "../../../components/notify";
import { Confirmation } from "../../../components/confirmation";
import { useOutletContext } from "react-router-dom";
import { FormIntruction } from "../../instructions/form";
import { CardInstructure } from "./card";
import { useDispatchAction } from "../../../hooks/useDispatchAction";
import { responseMessage } from "../../../features/messageLog";
import {
  InstructionsAdmin,
  InstructionAdminDelete,
} from "../../../actions/admin";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

import { useState } from "react";

export const InstructionsUpdate = () => {
  const [open, setOpen, isEdit, setEdit] = useOutletContext();
  const [init, setInit] = useState();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [stateId, setStateId] = useState();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { entities, status } = useSelector(
    (state) => state.instructionsAdminSlice
  );

  useDispatchAction(InstructionsAdmin, status, "option");
  const editAction = (e) => {
    setEdit(true);
    setOpen(true);
    setInit(e);
  };

  const trashAction = (e) => {
    setOpenConfirmation(true);
    setStateId(e.id);
  };

  const handleDelete = (id) => {
    dispatch(InstructionAdminDelete({ id })).then((res) => {
      if (res.payload.status === 200) {
        dispatch(responseMessage(res.payload.message));
        dispatch(InstructionsAdmin({}));
        setOpenConfirmation(false);
      }
    });
  };

  return (
    <>
      <Grid container rowSpacing={2} alignItems={"center"} dir="rtl">
        {status === "succeeded" &&
          entities?.data?.instructions?.map((item, i) => (
            <Grid item xs={6} sm={3} md={2} key={i}>
              <CardInstructure
                date="1401/1/1234"
                name={item?.name}
                url={item?.path}
                editAction={editAction}
                trashAction={trashAction}
                item={item}
              />
            </Grid>
          ))}
      </Grid>
      <Confirmation
        statusConfirmation={openConfirmation}
        stateId={stateId}
        setOpenConfirmation={setOpenConfirmation}
        msg={"حذف دستورالعمل"}
        bodymsg={"آیا می خواهید دستورالعمل را حذف کنید؟"}
        handleExecution={handleDelete}
      />
      <FormIntruction open={open} setOpen={setOpen} edit={isEdit} init={init} />
      <Notifier />
    </>
  );
};
