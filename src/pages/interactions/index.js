import { Grid, Card, Typography, Divider } from "@mui/material";
import { Box } from "@mui/system";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DatePicker } from "../../components/datepicker";
import Button from "@mui/material/Button";
import meeting from "./meeting.gif";
import call from "./call.gif";
import { HeaderPage } from "../../components/headerPage";

export const Interactions = () => {
  
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const timeline = [
    { time: "08:00", status: "AM", mess: "جلسه با مس سرچشمه", bodyMess: "" },
    {
      time: "08:00",
      status: "PM",
      mess: "جلسه با مس سرچشمه",
      bodyMess: "اعضا: آقای عباسی، نیکایی و...",
    },
    { time: "08:00", status: "AM", mess: "تماس با آقای سیف علیشاهی" },
    { time: "08:00", status: "AM" },
    { time: "08:00", status: "PM" },
    { time: "08:00", status: "AM" },
    { time: "01:00", status: "PM" },
    { time: "02:00", status: "AM" },
    { time: "03:00", status: "AM" },
    { time: "08:00", status: "AM" },
  ];

  const navigateToCalls = ()=>{
    navigate("calls");
  }

  const navigateToMeetings = ()=>{
    navigate("meetings");
  }


  return (
    <>
      <HeaderPage title={t("intractions")} page="dashboard" />
      <Grid container dir="rtl" spacing={2}>
      <Grid item xl={8} md={8}>
        <Card sx={{ padding: "12px" }}>
          {timeline.map((e, i) => (
            <Grid container key={i}>
              <Grid item xl={2} md={2}>
                <Typography>{e.time}</Typography>
              </Grid>
              <Grid item xl={10} md={10} mb={2}>
                <Box
                  sx={{
                    background: "#F7C3E0",
                    borderRadius: "14px",
                    padding: "12px",
                  }}
                >
                  <Typography>{e.time}</Typography>
                  <Typography>{e?.mess}</Typography>
                  <Typography>{e?.bodyMess}</Typography>
                </Box>
              </Grid>
            </Grid>
          ))}
        </Card>
      </Grid>
      <Grid item xl={4} md={4}>
        <Card sx={{ padding: "20px" }}>
          <DatePicker />
        </Card>
        <Grid container spacing={2} mt={1}>
          <Grid item xl={6} md={6}>
            <Button variant="text" onClick={navigateToCalls}>
              <Card
                sx={{
                  background: "#F7541E",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <img src={call} />
                <Typography>{"تماس ها"}</Typography>
              </Card>
            </Button>
          </Grid>
          <Grid item xl={6} md={6}>
            <Button variant="text" onClick={navigateToMeetings}>
              <Card
                sx={{
                  background: "#5041BC",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <img src={meeting} />
                <Typography>{"جلسات"}</Typography>
              </Card>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </>

  );
};
