import { Grid } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import { useEffect, useReducer, useRef, useState } from "react";
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

export const Notes = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const note_id = useRef();
  const messageBody = useRef();
  const mentioned_someOne = useRef();
  const [title, setTitle] = useState();
  const [disabled, setDisabled] = useState(true);
  const [disabledMessage, setDisabledMessage] = useState(true);

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

  const handleClick = (e) => {
    if (e?.title) {
      setTitle(e.title);
    } else if (e?.user.name) {
      setTitle(e?.user.name);
    }

    const findMention = noteTitle.find((k) => k.id === e.id);
    if (findMention?.note_id) {
      dispatch(messageNoteAction({ id: findMention?.note_id })).then((e) => {
        note_id.current = findMention?.note_id;
        setDisabledMessage(false);
      });
      setMentionMessage(findMention);
    }

    dispatch(noteMessageAction({ id: e.id }));
    if (e?.current_message) {
      note_id.current = e?.current_message?.note_id;
      dispatch(messageNoteAction({ id: e?.current_message?.note_id }));
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
      note_id: note_id.current,
      mention_id: mentioned_someOne.current,
      attach: "",
    };
    
    if (!res.attach) {
      delete res.attach;
    }
    if (!res.mention_id) {
      delete res.mention_id;
    }
    if (res.note_id && res.body) {
      dispatch(storeMessageNote({ id: note_id.current, res }));
    }

  };

  const selectChange = (e, value, reason, details) => {
    mentioned_someOne.current = value.id;
  };

  const handleChangeMessage = (e) => {
    if (!e.target.value) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const [open, setOpen] = useState(false);

  const openNoteForm = ()=>{
    setOpen(true)
  }

  return (
    <>
    <NoteForm open={open} setOpen={setOpen} title="new note"/>
      <HeaderPage title={t("notes")}>
        <Grid item>
          <Button variant="contained" onClick={openNoteForm}>new note</Button>
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
              <TitleMessage mt={3} text={"all notes"}>
                <AllMessage />
              </TitleMessage>
              {noteTitle
                .filter((e) => !e?.user)
                .map((e, i) => (
                  <BodyMessage
                    key={i}
                    background={e?.back}
                    color={"#017874"}
                    handleClick={() => handleClick(e)}
                    status={"typing"}
                    name={e?.title}
                    // time={convertDigits(format(new Date(e.created_at), "HH:mm"))}
                  ></BodyMessage>
                ))}
              <TitleMessage mt={2} text={"mentioned_messages"}>
                <Filled />
              </TitleMessage>
              {noteTitle
                .filter((e) => e?.user)
                ?.map((e, i) => (
                  <BodyMessage
                    key={i}
                    background={e?.back}
                    handleClick={() => handleClick(e)}
                    color={"#017874"}
                    status={"typing"}
                    name={e?.user?.name}
                    time={convertDigits(
                      format(new Date(e?.created_at), "HH:mm")
                    )}
                  ></BodyMessage>
                ))}
            </Card>
          </Grid>
          <Grid item container xl={8} md={8} flexDirection="column">
            <Card
              sx={{
                padding: "12px",
                width: "100%",
                height: "742px",
                overflowY: "scroll",
              }}
            >
              {/* {!messagesNote?.data?.messages && (
                  <MessageOfTicketReciver
                    message={mentionMessage?.body}
                    color="#242731"
                    background="#017874"
                  />
                )} */}
              <Box
                sx={{
                  position: "sticky",
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

              {messagesNote?.data?.messages.map((e, i) => (
                <MessageOfTicketSender
                  key={i}
                  message={e.body}
                  own={e}
                  color="white"
                  background="#017874"
                />
              ))}

              <Grid
                item
                container
                sx={{
                  position: "sticky",
                  bottom: 0,
                  background: "#F5F6FA",
                  width: "100%",
                  border: "1px solid #E9E9F2",
                  borderRadius: "16px",
                  padding: "10px 10px 10px 14px",
                }}
                mt={2}
              >
                <IconButton aria-label="menu" disabled={disabledMessage}>
                  <UploadIcon />
                </IconButton>

                <Autocomplete
                  id="combo-box-demo"
                  options={
                    statusDependencies === "succeeded"
                      ? entitiesDependencies?.data
                      : []
                  }
                  disabled={disabledMessage}
                  getOptionLabel={(option) => option.name}
                  onChange={selectChange}
                  sx={{ width: 100 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label={t("mentiond")}
                    />
                  )}
                />
                <TextField
                  sx={{ ml: 1, flex: 1, width: "100%" }}
                  placeholder=""
                  onChange={handleChangeMessage}
                  inputRef={messageBody}
                  disabled={disabledMessage}
                  variant="standard"
                  label={t("messageContext")}
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
        </Grid>
      </Grid>
    </>
  );
};

const Circle = ({ num }) => {
  return (
    <Grid
      item
      sx={{
        background: "#FF6370",
        color: "white",
        borderRadius: "100%",
        width: "15px",
        height: "15px",
        textAlign: "center",
        fontSize: "10px",
      }}
    >
      {num}
    </Grid>
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
      sx={{ background: background, cursor: "pointer" }}
      mb={4}
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

const SearchSection = () => {
  return (
    <Paper sx={{ padding: "12px", width: "100%" }}>
      <TextField
        id="standard-basic"
        variant="standard"
        sx={{ width: "100%" }}
      />
    </Paper>
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
      justifyContent={own.own === 0 ? "flex-end" : "flex-start"}
      mb={2}
    >
      <Grid
        item
        sx={{
          background: own.own === 0 ? "#017874" : "silver",
          width: "400px",
          borderRadius: "16px 0px 16px 16px",
          padding: "10px 10px 10px 14px",
          height: "fit-content",
        }}
      >
        <Typography color={color}>{message}</Typography>
        <Typography color={nameColor}>{own?.mentioned_user?.name}</Typography>
      </Grid>
    </Grid>
  );
};

const MessageOfTicketReciver = ({ message, color, nameColor, handleClick }) => {
  return (
    <Grid container justifyContent="flex-end" mb={2}>
      <Grid
        item
        sx={{
          background: "#F5F6FA",
          width: "400px",
          borderRadius: "0px 16px 16px 16px",
          padding: "10px 10px 10px 14px",
          height: "fit-content",
        }}
      >
        <Typography color={color}>{message}</Typography>
        <Typography color={nameColor}>name</Typography>
      </Grid>
    </Grid>
  );
};
