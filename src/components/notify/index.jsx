import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { clearMessage } from "../../features/messageLog";

const Notifier = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { messages } = useSelector((state) => state.messageLog);

  React.useEffect(() => {
    messages.forEach((message) => {
        
      enqueueSnackbar(message.mess, {
        variant:message.variant,
        anchorOrigin:{vertical: "top", horizontal: "right"},
        onExited: (event, myKey) => {
          dispatch(clearMessage());
        },
      });
    });
  }, [messages, closeSnackbar, enqueueSnackbar, dispatch]);

  return null;
};

export default Notifier;
