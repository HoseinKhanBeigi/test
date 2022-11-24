import { Grid } from "@mui/material";
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from '@mui/material/IconButton';
import Input from "@mui/material/Input";
import { useRef, useState } from "react";
import {
  Filled,
  SeenMessage,
  AllMessage,
  PhoneIcon,
  PhoneOption,
  UploadIcon,
  SendIcon,
} from "../../components/icons";

export const Notes = () => {
  const [currentSelect, setCurrentSelect] = useState([
    { state: false, name: "all" },
    { state: false, name: "all2" },
    { state: false, name: "all3" },
    { state: false, name: "all4" },
    { state: false, name: "all5" },
    { state: false, name: "all6" },
  ]);
  const handleClick = (event) => {
    const newState = currentSelect.map((e) => {
      if (e.name === event.currentTarget.getAttribute("data-name")) {
        return {
          ...e,
          state: true,
        };
      } else {
        return {
          ...e,
          state: false,
        };
      }
    });

    setCurrentSelect(newState);
  };

  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    <Grid container>
      <Grid
        container
        dir="rtl"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Grid item>
          <Grid
            item
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "760px" }}
          >
            <Grid item>
              <Typography>notes</Typography>
            </Grid>
            <Circle num={2} />
            <Grid item>
              <Grid
                container
                justifyContent="space-between"
                sx={{ width: "632px", background: "#f3f3f3" }}
              >
                <Grid
                  item
                  padding={1}
                  onClick={handleClick}
                  data-name="all"
                  sx={{ background: currentSelect[0].state ? "#E5FFF6" : "" }}
                >
                  <Typography color={currentSelect[0].state ? "#017874" : ""}>
                    all
                  </Typography>
                </Grid>
                <Grid
                  item
                  padding={1}
                  onClick={handleClick}
                  data-name="all2"
                  sx={{ background: currentSelect[1].state ? "#E5FFF6" : "" }}
                >
                  <Typography color={currentSelect[1].state ? "#017874" : ""}>
                    allasda asd
                  </Typography>
                </Grid>
                <Grid
                  item
                  padding={1}
                  onClick={handleClick}
                  data-name="all3"
                  sx={{ background: currentSelect[2].state ? "#E5FFF6" : "" }}
                >
                  <Typography color={currentSelect[2].state ? "#017874" : ""}>
                    all
                  </Typography>
                </Grid>
                <Grid
                  item
                  padding={1}
                  onClick={handleClick}
                  data-name="all4"
                  sx={{ background: currentSelect[3].state ? "#E5FFF6" : "" }}
                >
                  <Typography color={currentSelect[3].state ? "#017874" : ""}>
                    alasdl asd
                  </Typography>
                </Grid>
                <Grid
                  item
                  padding={1}
                  onClick={handleClick}
                  data-name="all5"
                  sx={{ background: currentSelect[4].state ? "#E5FFF6" : "" }}
                >
                  <Typography color={currentSelect[4].state ? "#017874" : ""}>
                    alasdasdadss sdl
                  </Typography>
                </Grid>
                <Grid
                  item
                  padding={1}
                  onClick={handleClick}
                  data-name="all6"
                  sx={{ background: currentSelect[5].state ? "#E5FFF6" : "" }}
                >
                  <Typography color={currentSelect[5].state ? "#017874" : ""}>
                    alasdl
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button variant="contained">new note</Button>
        </Grid>
      </Grid>
      <Grid container dir="rtl" spacing={2}>
        <Grid item container xl={4}>
          <Card sx={{ padding: "12px", width: "100%" }}>
            <SearchSection />
            <TitleMessage mt={2} text={"neshan shode"}>
              <Filled />
            </TitleMessage>
            <BodyMessage
              background={"#E5FFF6"}
              color={"#017874"}
              status={"typing"}
            >
              {"aasd"}
            </BodyMessage>
            <BodyMessage status={"seen"}>
              <SeenMessage />
            </BodyMessage>
            <BodyMessage color="rgba(59, 59, 59, 0.45)" status={"summery"}>
              {"aasd"}
            </BodyMessage>
            <TitleMessage mt={3} text={"all notes"}>
              <AllMessage />
            </TitleMessage>
            <BodyMessage color="rgba(59, 59, 59, 0.45)" status={"summery"}>
              {"aasd"}
            </BodyMessage>
            <BodyMessage color="rgba(59, 59, 59, 0.45)" status={"summery"}>
              {"aasd"}
            </BodyMessage>
            <BodyMessage color="rgba(59, 59, 59, 0.45)" status={"summery"}>
              {"aasd"}
            </BodyMessage>
          </Card>
        </Grid>
        <Grid item container xl={8}>
          <Card sx={{ padding: "12px", width: "100%" }}>
            <Paper
              sx={{
                padding: "12px",
                width: "100%",
                borderBottom: "1px solid silver",
              }}
            >
              <Grid
                container
                justifyContent={"space-between"}
                alignItems="center"
              >
                <Typography>name</Typography>
                <Grid item>
                  <PhoneIcon />
                  <PhoneOption />
                </Grid>
              </Grid>
            </Paper>
            <Grid container sx={{ height: "646px", overflowY: "scroll" }}>
              <MessageOfTicketSender
                message={
                  "asdadj a dadald  skdfsdf ksdjf sjdfgsdfjfdhjsdfghsgf gdsfjsd gjsfgfgghjhfsf  jfkjsg"
                }
                color="white"
                background="#017874"
              />
              <MessageOfTicketReciver
                message={
                  "asdadj a dadald  skdfsdf ksdjf sjdfgsdfjfdhjsdfghsgf gdsfjsd gjsfgfgghjhfsf  jfkjsg"
                }
                color="#242731"
                background="#017874"
              />
              <MessageOfTicketSender
                message={
                  "asdadj a dadald  skdfsdf ksdjf sjdfgsdfjfdhjsdfghsgf gdsfjsd gjsfgfgghjhfsf  jfkjsg"
                }
                color="white"
                background="#017874"
              />
              <MessageOfTicketReciver
                message={
                  "asdadj a dadald  skdfsdf ksdjf sjdfgsdfjfdhjsdfghsgf gdsfjsd gjsfgfgghjhfsf  jfkjsg"
                }
                color="#242731"
                background="#017874"
              />

              <MessageOfTicketSender
                message={
                  "asdadj a dadald  skdfsdf ksdjf sjdfgsdfjfdhjsdfghsgf gdsfjsd gjsfgfgghjhfsf  jfkjsg"
                }
                color="white"
                background="#017874"
              />
                <MessageOfTicketSender
                message={
                  "asdadj a dadald  skdfsdf ksdjf sjdfgsdfjfdhjsdfghsgf gdsfjsd gjsfgfgghjhfsf  jfkjsg"
                }
                color="white"
                background="#017874"
              />
            </Grid>
       
              <Grid
                item
                container
                sx={{
                  background: "#F5F6FA",
                  width: "100%",
                  border: "1px solid #E9E9F2",
                  borderRadius: "16px",
                  padding: "10px 10px 10px 14px",
                }}
              >
                <IconButton sx={{ p: "10px" }} aria-label="menu">
                 < UploadIcon />
                </IconButton>
                <Input
                  sx={{ ml: 1, flex: 1 , width:"100%" }}
                  placeholder=""
                  inputProps={{ "aria-label": "search google maps" }}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                 < SendIcon />
                </IconButton>
              </Grid>

          </Card>
        </Grid>
      </Grid>
    </Grid>
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

const BodyMessage = ({ children, background, color, status }) => {
  return (
    <Grid item sx={{ background: background }} mb={4}>
      <Grid container justifyContent={"space-between"}>
        <PName name={"mess rafassanjan"} />
        <Ptime time={"4:20 PM"} />
      </Grid>
      <Grid container justifyContent={"space-between"}>
        <Typography color={color}>
          {/* {status !== "seen" ? Value : <Value />} */}
          {children}
        </Typography>
        {status === "typing" && <Circle num={2} />}
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

const MessageOfTicketSender = ({ message, color, background, nameColor }) => {
  return (
    <Grid container mb={2} justifyContent="flex-start">
      <Grid
        item
        sx={{
          background: background,
          width: "400px",
          borderRadius: "16px 0px 16px 16px",
          padding: "10px 10px 10px 14px",
        }}
      >
        <Typography color={color}>{message}</Typography>
        <Typography color={nameColor}>name</Typography>
      </Grid>
    </Grid>
  );
};

const MessageOfTicketReciver = ({ message, color, nameColor }) => {
  return (
    <Grid container mb={2} justifyContent="flex-end">
      <Grid
        item
        sx={{
          background: "#F5F6FA",
          width: "400px",
          borderRadius: "0px 16px 16px 16px",
          padding: "10px 10px 10px 14px",
        }}
      >
        <Typography color={color}>{message}</Typography>
        <Typography color={nameColor}>name</Typography>
      </Grid>
    </Grid>
  );
};
