import { Grid, Card, Typography, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker } from "../../components/datepicker";
import meeting from "./meeting.png";

export const Interactions = () => {
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

  return (
    <Grid container dir="rtl" spacing={2}>
      <Grid item xl={8}>
        <Card sx={{ padding: "12px" }}>
          {timeline.map((e, i) => (
            <Grid container key={i}>
              <Grid item xl={2}>
                <Typography>{e.time}</Typography>
              </Grid>
              <Grid item xl={10} mb={2}>
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
      <Grid item xl={4}>
        <Card sx={{ padding: "20px" }}>
          <DatePicker />
        </Card>
        <Grid container spacing={2} mt={1}>
          <Grid item xl={6}>
            <Card sx={{ padding: "20px" }}>
              <img src={meeting} />
            </Card>
          </Grid>

          <Grid item xl={6}>
            <Card sx={{ padding: "20px" }}>
              <img src={meeting} />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
