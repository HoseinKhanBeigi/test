import { Grid, Card, Typography, Divider } from "@mui/material";
import { Box } from "@mui/system";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { getDates } from "../../components/calender/getDates";
import { useTranslation } from "react-i18next";
import { interactions } from "../../actions/interactions";
import { DatePicker } from "../../components/datepicker";
import Button from "@mui/material/Button";
import meeting from "./meeting.gif";
import call from "./call.gif";
import { HeaderPage } from "../../components/headerPage";
import { useDispatch, useSelector } from "react-redux";
// import { interactions } from "../../actions/interactions";
import { format } from "date-fns-jalali";
import { convertDigits } from "persian-helpers";
import noresult from "./noresult.png";
import { useEffect } from "react";
import moment from "moment";

export const Interactions = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateToCalls = () => {
    navigate("calls");
  };

  const navigateToMeetings = () => {
    navigate("meetings");
  };

  const { status, entities, error } = useSelector(
    (state) => state.interactionSlice
  );

  const { statusDashboard, entitiesDashboard } = useSelector(
    (state) => state.dashboardAppSlice
  );

  const handleGetMeeting = (date) => {
    const val = moment(new Date(date.day)).locale("en").format("YYYY-MM-DD");
    const res = {
      date: val,
    };
    dispatch(interactions(res));
  };

  return (
    <>
      <HeaderPage title={t("intractions")} page="dashboard" />
      <Grid container dir="rtl" spacing={2}>
        <Grid item xl={8} md={8}>
          <Card
            sx={{
              padding: "12px",
              height: "100%",
              // display: "flex",
              // justifyContent: "center",
              // flexDirection:"column"
            }}
          >
            {status === "succeeded" && entities.data?.meetings.length !== 0 ? (
              entities.data?.meetings?.map((e, i) => (
                <Grid container key={i}>
                  <Grid item xl={2} md={2}>
                    <Typography>
                      {" "}
                      {convertDigits(format(new Date(e?.start), "HH:mm"))}
                    </Typography>
                  </Grid>
                  <Grid item xl={10} md={10} mb={2}>
                    <Box
                      sx={{
                        background: "#F7C3E0",
                        borderRadius: "14px",
                        padding: "12px",
                      }}
                    >
                      <Typography>
                        {" "}
                        {convertDigits(format(new Date(e?.start), "HH:mm"))}
                      </Typography>
                      <Typography>{e?.client.name}</Typography>
                      <Typography>{e?.bodyMess}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              ))
            ) : (
              <Grid container justifyContent={"center"}>
                <img src={noresult} />
              </Grid>
            )}
          </Card>
        </Grid>
        <Grid item xl={4} md={4}>
          <Card sx={{ padding: "20px" }}>
            <DatePicker handleGetMeeting={handleGetMeeting} entitiesDashboard={entitiesDashboard}/>
          </Card>
          <Grid container spacing={2} mt={1}>
            {entitiesDashboard?.data?.user.super_admin === 1 ? (
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
            ) : (
              entitiesDashboard?.data?.user.permissions.some(
                (e) => e.name === "call_show"
              ) && (
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
              )
            )}
            {entitiesDashboard?.data?.user.super_admin === 1 ? (
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
            ) : (
              entitiesDashboard?.data?.user.permissions.some(
                (e) => e.name === "meeting_show"
              ) && (
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
              )
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
