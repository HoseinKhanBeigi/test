import { Grid } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import {
  Filled,
  SeenMessage,
  AllMessage,
  PhoneIcon,
  PhoneOption,
  UploadIcon,
  SendIcon,
} from "../../components/icons";
import { HeaderPage } from "../../components/headerPage";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useDispatchAction } from "../../hooks/useDispatchAction";
import moment from "moment";
import {
  addMonths,
  format,
  getMonth,
  setMonth,
  setYear,
  subMonths,
} from "date-fns-jalali";
import { convertDigits } from "persian-helpers";
import { noteMessageAction } from "../../features/notes";
import {
  messageNoteAction,
  storeMessageNote,
  notesAction,
  messageDepedencies,
} from "../../actions/notes";
import { removeMessageNote } from "../../features/noteMessage";
import { removeDependencies } from "../../features/noteDepedencies";
import { RHAuto } from "../../components/hook-form";
import { NoteForm } from "../../components/noteDialog";
import { useNavigate, useParams } from "react-router-dom";

export const Notes = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const note_id = useRef();
  const messageBody = useRef();
  const paperRef = useRef();
  const mentioned_someOne = useRef();
  const [title, setTitle] = useState();
  const [disabled, setDisabled] = useState(true);
  const [disabledMessage, setDisabledMessage] = useState(true);
  const [value, setValue] = useState(null);

  const { status, noteTitle } = useSelector((state) => state.noteSlice);

  const [mentionMessage, setMentionMessage] = useState();
  const { statusMessage, messagesNote } = useSelector(
    (state) => state.messageNoteSlice
  );
  const { statusDependencies, entitiesDependencies } = useSelector(
    (state) => state.noteDependencies
  );
  useDispatchAction(notesAction, status);
  useDispatchAction(messageDepedencies, statusDependencies, "option");

  useEffect(() => {
    if (params.id && status === "succeeded" && statusMessage === "idle") {
      dispatch(messageNoteAction({ id: params.id })).then(() => {
        dispatch(noteMessageAction({ id: params.id }));
      });
    }
  }, [status, dispatch]);

  const handleClick = (e) => {
    if (e?.current_message || e?.current_message === null) {
      setTitle(e?.client.name);
    } else if (e?.user.name) {
      setTitle(e?.user.name);
    }

    const findMention = noteTitle.find((k) => k.id === e.id);
    if (findMention?.note_id) {
      navigate(`/notes/${findMention?.note_id}`);
      dispatch(noteMessageAction({ id: findMention?.note_id }));
      dispatch(messageNoteAction({ id: findMention?.note_id })).then((e) => {
        note_id.current = findMention?.note_id;
        setDisabledMessage(false);
      });
      setMentionMessage(findMention);
    } else if (findMention?.note_id === undefined) {
      // note_id.current = e?.id;
      dispatch(noteMessageAction({ id: e.id }));
      dispatch(messageNoteAction({ id: e.id }));
      navigate(`/notes/${e.id}`);
      // dispatch(messageDepedencies({}));
      setDisabledMessage(false);
    } else {
      dispatch(removeMessageNote());
      note_id.current = "";
      messageBody.current.value = "";
      setDisabledMessage(true);
      setDisabled(true);
    }
  };
  const sendMessage = () => {
    const res = {
      body: messageBody.current.value,
      note_id: params.id,
      mention_id: mentioned_someOne.current?.id,
      attach: "",
    };

    if (!res.attach) {
      delete res.attach;
    }
    if (!res.mention_id || res.mention_id === null) {
      delete res.mention_id;
    }
    if (res.note_id && res.body) {
      dispatch(storeMessageNote({ id: res.note_id, res })).then(() => {
        note_id.current = "";
        messageBody.current.value = "";
        dispatch(removeMessageNote());
        // dispatch(notesAction({})).then(()=>{

        // });
        dispatch(messageNoteAction({ id: res.note_id })).then(() => {
          paperRef.current.scroll({
            top: paperRef.current.scrollHeight,
            behavior: "smooth",
          });
          dispatch(noteMessageAction({ id: params.id }));
        });
      });
    }
  };

  const selectChange = (value) => {
    console.log(value);
    mentioned_someOne.current = value;
  };

  const handleChangeMessage = (e) => {
    if (!e.target.value) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const [open, setOpen] = useState(false);

  const openNoteForm = () => {
    setOpen(true);
  };

  return (
    <>
      <NoteForm open={open} setOpen={setOpen} title="یادداشت جدید" />
      <HeaderPage title={t("notes")}>
        <Grid item>
          <Button variant="contained" onClick={openNoteForm}>
            {"یادداشت جدید"}
          </Button>
        </Grid>
      </HeaderPage>
      <Grid container>
        <Grid container dir="rtl" spacing={2}>
          <Grid
            item
            container
            md={4}
            xl={4}
            sx={{
              scrollbarColor: "rebeccapurple green",
              scrollbarWidth: "thin",
            }}
          >
            <Card
              sx={{
                padding: "12px",
                width: "100%",
                height: "740px",
                overflowY: "scroll",
              }}
            >
              <TitleMessage mt={3} text={"همه ی یادداشت ها"}>
                <AllMessage />
              </TitleMessage>
              {noteTitle
                .filter((e) => e?.client)
                .map((e, i) => (
                  <BodyMessage
                    key={i}
                    background={e?.back}
                    color={"#017874"}
                    handleClick={() => handleClick(e)}
                    status={"typing"}
                    name={e?.client?.name}
                    time={convertDigits(
                      format(new Date(e.created_at), "HH:mm")
                    )}
                  ></BodyMessage>
                ))}
              <TitleMessage mt={2} text={"ارسال از دیگران"}>
                <Filled />
              </TitleMessage>
              {noteTitle
                .filter((e) => !e?.client)
                ?.map((e, i) => (
                  <BodyMessage
                    key={i}
                    background={e?.back}
                    handleClick={() => handleClick(e)}
                    color={"#017874"}
                    status={"typing"}
                    name={e?.user?.name}
                    time={convertDigits(
                      format(new Date(e.created_at), "HH:mm")
                    )}
                  ></BodyMessage>
                ))}
            </Card>
          </Grid>
          {params.id && (
            <Grid item container xl={8} md={8} flexDirection="column">
              <Card>
                <Paper sx={{ padding: "12px" }}>
                  <Box
                    sx={{
                      position: "relative",
                      top: 0,
                      width: "100%",
                      height: "59px",
                      borderBottom: "1px solid",
                      borderBottomColor: "silver",
                      background: "white",
                    }}
                  >
                    {title}
                  </Box>
                </Paper>

                <Paper
                  ref={paperRef}
                  sx={{
                    padding: "12px",
                    width: "100%",
                    height: "602px",
                    overflowY: "scroll",
                  }}
                >
                  {messagesNote?.data?.messages.map((e, i) => (
                    <MessageOfTicketSender
                      key={i}
                      message={e.body}
                      own={e}
                      color="white"
                      background="#017874"
                    />
                  ))}
                </Paper>
                <Grid
                  item
                  container
                  sx={{
                    position: "relative",
                    bottom: "0px",
                    background: "#F5F6FA",
                    width: "100%",
                    border: "1px solid #E9E9F2",

                    padding: "10px 10px 10px 14px",
                  }}
                  mt={2}
                >
                  {/* <IconButton aria-label="menu" disabled={disabledMessage}>
                  <UploadIcon />
                </IconButton> */}

                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={entitiesDependencies?.data}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                      selectChange(newValue);
                    }}
                    value={value}
                    getOptionLabel={(option) => option.name}
                    sx={{ width: 150 }}
                    renderInput={(params) => (
                      <TextField {...params} label="@..." variant="standard" />
                    )}
                  />
                  <TextField
                    sx={{ ml: 1, flex: 1, width: "100%" }}
                    placeholder=""
                    onChange={handleChangeMessage}
                    inputRef={messageBody}
                    disabled={disabledMessage}
                    variant="standard"
                    label={t("تایپ موارد دلخواه ....")}
                    inputProps={{ "aria-label": "search google maps" }}
                  />

                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                    onClick={sendMessage}
                    disabled={disabled}
                  >
                    <SendIcon fill={!disabled ? "#017874" : "silver"} />
                  </IconButton>
                </Grid>
              </Card>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};

const Ptime = ({ time }) => {
  return (
    <Typography fontSize={"12px"} color={"#777777"}>
      {time}
    </Typography>
  );
};

const PName = ({ name }) => {
  return <Typography fontWeight={400}>{name}</Typography>;
};

const BodyMessage = ({
  children,
  name,
  time,
  background,
  color,
  status,
  handleClick,
}) => {
  return (
    <Grid
      item
      sx={{ background: background, cursor: "pointer", padding: "24px" }}
      onClick={handleClick}
    >
      <Grid container justifyContent={"space-between"}>
        <PName name={name} />
        <Ptime time={time} />
      </Grid>
      <Grid container justifyContent={"space-between"}>
        <Typography color={color}>{children}</Typography>
      </Grid>
    </Grid>
  );
};
const Title = ({ text, color, fontSize }) => {
  return (
    <Typography color={color} fontSize={fontSize}>
      {text}
    </Typography>
  );
};

const TitleMessage = ({ children, mt, text }) => {
  return (
    <Grid item container mt={mt} mb={2}>
      {children}
      <Title text={text} color="#777777" fontSize="12px" />
    </Grid>
  );
};

const MessageOfTicketSender = ({
  message,
  color,
  background,
  nameColor,
  own,
}) => {
  return (
    <Grid
      container
      justifyContent={own.own === 1 ? "flex-end" : "flex-start"}
      mb={2}
    >
      <Grid
        item
        sx={{
          background: own.own === 1 ? "#017874" : "silver",
          width: "400px",
          borderRadius:
            own.own === 0 ? "0px 16px 16px 16px" : "16px 0px 16px 16px",
          padding: "10px 10px 10px 14px",
          height: "fit-content",
        }}
      >
        <Typography color={color}>{message}</Typography>
        <Typography color={nameColor} fontSize={12}>
          {own?.mentioned_user?.name}
        </Typography>
      </Grid>
    </Grid>
  );
};
