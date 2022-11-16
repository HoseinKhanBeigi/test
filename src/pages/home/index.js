import * as React from "react";
import { Link } from "react-router-dom";
import { Line } from "../../components/charts";
import { CustomizeDayPicker } from "../../components/datePicker";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import person from "./person.png";
import rankImg from "./rankImg.png";
import {
  Curve,
  Clients,
  Flash,
  Frame1325,
  Frame1326,
  RectTangle1,
  RectTangle2,
} from "../../components/icons";
import { Typography } from "@mui/material";
import "./index.css";
import { boxSizing } from "@mui/system";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  // marginLeft:theme.spacing(8),
  // marginRight:theme.spacing(8)
}));

const IconPaper = styled("div")(({ theme }) => ({
  backgroundColor: "#017874",
  width: "40px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "7px",
  marginBottom: "16px",
}));

const CardClients = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
}));

const RankClients = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
}));

const RankCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
}));

const Notescard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
}));

export const Home = () => {
  const switch1 = React.useRef("");

  const handleChange = (e) => {
    const spanClients = document.querySelector(".spanClients");
    const spanClients2 = document.querySelector(".spanClients2");
    if (e.currentTarget.checked) {
      spanClients.classList.remove("white-text");
      spanClients2.classList.add("white-text");
    } else if (e.currentTarget.checked === false) {
      spanClients.classList.add("white-text");
      spanClients2.classList.remove("white-text");
    }
  };

  React.useEffect(() => {
    const spanClients = document.querySelector(".spanClients");
    const spanClients2 = document.querySelector(".spanClients2");
    if (switch1.current.checked) {
      spanClients.classList.remove("white-text");
      spanClients2.classList.add("white-text");
    } else if (switch1.current.checked === false) {
      spanClients.classList.add("white-text");
      spanClients2.classList.remove("white-text");
    }
  }, []);

  return (
    <Box>
      <Grid container justifyContent="end" mb={8}>
        <Grid item>
          میز کار
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} xl={4}>
          <Item>
            <CustomizeDayPicker />
          </Item>
        </Grid>
        <Grid item xs={12} xl={8}>
          <Item>
            <Line />
          </Item>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} xl={8}>
              <RankClients>
                <Grid
                  container
                  justifyContent={"space-between"}
                  alignItems="center"
                >
                  <Grid sx={{ position: "relative", top: "-16px" }}>
                    <div>
                      <span className="spanClients">خود</span>
                      <span className="spanClients2">هم تیمی ها</span>
                    </div>

                    <div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          onChange={handleChange}
                          ref={switch1}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </Grid>
                  <Typography>فاصله شما نست به هدف</Typography>
                </Grid>
                <Grid
                  container
                  flexDirection="row"
                  justifyContent={"end"}
                  mt={6}
                >
                  <Grid
                    item
                    container
                    xs={3}
                    justifyContent={"end"}
                    alignItems="center"
                    gap={2}
                  >
                    <Typography>رتبه شما</Typography>
                    <Frame1325 />
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    container
                    justifyContent={"end"}
                    alignItems="center"
                    gap={2}
                  >
                    <Typography>رتبه شما</Typography>
                    <Frame1325 />
                  </Grid>
                </Grid>
                <Grid
                  container
                  mt={6}
                  justifyContent="start"
                  sx={{
                    position: "relative",
                  }}
                >
                  <Grid item>
                    <RectTangle1 />
                  </Grid>
                  <Grid item sx={{ position: "absolute" }}>
                    <RectTangle2 />
                  </Grid>
                  <Grid
                    item
                    sx={{
                      position: "absolute",
                      top: "-66px",
                    }}
                  >
                    <img src={person} />
                  </Grid>
                </Grid>
              </RankClients>
            </Grid>
            <Grid item xs={12} xl={4}>
              <CardClients>
                <Grid container justifyContent="center" alignContent="center">
                  <Grid container item xs={6} justifyContent="center">
                    <Curve />
                  </Grid>
                  <Grid
                    container
                    item
                    xs={6}
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <IconPaper>
                      <Clients stroke={"#ffffff"} />
                    </IconPaper>
                    <Typography mb={1}>مشتریان</Typography>
                    <Typography mb={1}>۱۵۶ نفر</Typography>
                    <Grid
                      item
                      container
                      gap={1}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography color={"#017874"}>70%</Typography>
                      <Flash />
                    </Grid>
                  </Grid>
                </Grid>
              </CardClients>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} xl={6}>
              <Notescard>
                <Grid container></Grid>
              </Notescard>
            </Grid>
            <Grid item xs={12} xl={6}>
              <RankCard
                sx={{
                  backgroundImage: `url(${rankImg})`,
                  backgroundSize: "cover",
                  height: "300px",
                  backgroundColor: "#017874",
                }}
              >
                <Grid container>
                  <Grid item container md={2}>
                    asd
                  </Grid>
                  <Grid item container md={10}>
                    asd
                  </Grid>
                </Grid>
              </RankCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
