import { HeaderPage } from "../../components/headerPage";
import { useTranslation } from "react-i18next";
import { Grid, Typography, Card, Box } from "@mui/material";
import {
  ClientHeaderCard,
  ClientHeaderButton,
  ClientInfo,
  PositionInfo,
  BoxButton,
} from "./card";
import {
  NoteIcon,
  NotifyIconProile,
  Phone,
  PhoneIcon,
} from "../../components/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LineChart } from "../../components/lineChart";
import { convertDigits } from "persian-helpers";
import delagations from "./delagations.gif";
import meeting from "../../pages/interactions/meeting.gif";
import call from "../../pages/interactions/call.gif";
import { useEffect, useState } from "react";
import {
  clientAgentsAction,
  clientDetail,
  clientMeetingsAction,
  clientCallsAction,
} from "../../actions/clients";
import { NoteForm } from "../../components/noteDialog";
export const ClientDetail = () => {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const {
    clientDetails,
    statusDetail,
    rankCategories,
    rankValuesFirstLine,
    rankValuesSecondLine,
    rankServiceCategories,
    rankServiceValuesFirstLine,
    rankServiceValuesSecondLine,
    rankAssingmentCategories,
    rankAssingmentValuesFirstLine,
    rankAssingmentValuesSecondLine,
    rankEquipmentsCategories,
    rankEquipmentsFirstLine,
    rankEquipmentsValuesSecondLine,
    rankTotalCategories,
    rankTotalFirstLine,
    rankTotalValuesSecondLine,
  } = useSelector((state) => state.clientDetailShow);

  useEffect(() => {
    if (statusDetail === "idle") {
      dispatch(
        clientDetail({
          id: params.id,
        })
      );
    }
  }, [statusDetail, dispatch]);
  const chartData = [
    {
      chart: "rankClient",
      series: [
        {
          name: "",
          data: rankValuesFirstLine,
        },
        { name: "", data: rankValuesSecondLine },
      ],
      categories: rankCategories,
      title: "تغییر وضعیت متوسط رتبه مشتری",
      background: "#A0CFF9",
    },
    {
      chart: "services",
      series: [
        {
          name: "",
          data: rankServiceValuesFirstLine,
        },
        {
          name: "",
          data: rankServiceValuesSecondLine,
        },
      ],
      categories: rankServiceCategories,
      title: "تغییر وضعیت مشتری در حوزه خدمات",
      background: "#C0DDC0",
    },
    {
      chart: "allocation",
      series: [
        {
          name: "",
          data: rankAssingmentValuesFirstLine,
        },
        {
          name: "",
          data: rankAssingmentValuesSecondLine,
        },
      ],
      categories: rankAssingmentCategories,
      title: "تغییر وضعیت مشتری در حوزه تخصیص",
      background: "#F7C3E0",
    },
    {
      chart: "equip",
      series: [
        {
          name: "",
          data: rankEquipmentsFirstLine,
        },
        {
          name: "",
          data: rankEquipmentsValuesSecondLine,
        },
      ],
      categories: rankEquipmentsCategories,
      title: "تغییر وضعیت مشتری در حوزه تجهیز",
      background: "#F7C3E0",
    },
    {
      chart: "totalScore",
      series: [
        {
          name: "",
          data: rankTotalFirstLine,
        },
        {
          name: "",
          data: rankTotalValuesSecondLine,
        },
      ],
      categories: rankTotalCategories,
      title: "تغییر امتیاز کل مشتری",
      background: "#A0CFF9",
    },
  ];

  const { statusDashboard, entitiesDashboard } = useSelector(
    (state) => state.dashboardAppSlice
  );

  const meetingForm = () => {
    if (
      entitiesDashboard?.data?.user.super_admin === 1 ||
      entitiesDashboard?.data?.user.permissions.some(
        (e) => e.name === "meeting_create"
      )
    ) {
      navigate("/interactions/meetings/create");
    }
  };
  const callForm = () => {
    if (
      entitiesDashboard?.data?.user.super_admin === 1 ||
      entitiesDashboard?.data?.user.permissions.some(
        (e) => e.name === "call_create"
      )
    ) {
      navigate("/interactions/calls/create");
    }
  };
  const AgantList = () => {
    navigate("agents");
    dispatch(
      clientAgentsAction({
        id: params.id,
      })
    );
  };
  const meetingList = () => {
    navigate("meetings");
    dispatch(
      clientMeetingsAction({
        id: params.id,
      })
    );
  };

  const callList = () => {
    navigate("calls");
    dispatch(
      clientCallsAction({
        id: params.id,
      })
    );
  };

  const [open, setOpen] = useState(false);
  const [openDrop, setDrop] = useState(true);

  const openNoteForm = () => {
    setOpen(true);
  };

  const handleClickDropDown = () => {
    setDrop((pre) => !pre);
  };
  return (
    <>
      <NoteForm open={open} setOpen={setOpen} title="یادداشت جدید" />
      <HeaderPage
        title={t("clientDetail")}
        page="detail"
        entities={clientDetails?.data?.client}
        status={statusDetail}
      />
      <Grid container dir="rtl" columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid item xs={12} sx={4} md={4}>
          <Card sx={{ padding: "16px" }}>
            <Grid container gap={2} flexDirection="column">
              <ClientHeaderCard
                value={clientDetails?.data?.client?.name}
                type={clientDetails?.data?.client?.type}
                background="#A5448E"
                color="white"
              />
              <ClientHeaderCard
                value={convertDigits(
                  clientDetails?.data?.client?.client_number
                )}
                type={clientDetails?.data?.client?.bi_point ?? "-"}
                background="#C0DDC0"
                color="#777777"
              />
              <Grid container>
                {/* <ClientHeaderButton name={"یادآوری"} handleClick={ClientHeaderButton}>
                  <NotifyIconProile stroke={"white"} />
                </ClientHeaderButton> */}
                <ClientHeaderButton
                  name={"جلسه جدید"}
                  handleClick={meetingForm}
                >
                  <NotifyIconProile stroke={"white"} />
                </ClientHeaderButton>
                <ClientHeaderButton name={"تماس جدید"} handleClick={callForm}>
                  <Phone stroke={"white"} />
                </ClientHeaderButton>
                <ClientHeaderButton
                  name={"یادداشت جدید"}
                  handleClick={openNoteForm}
                >
                  <NoteIcon stroke={"white"} />
                </ClientHeaderButton>
              </Grid>
              <Grid container flexDirection={"column"} gap={1}>
                <ClientInfo infokey={"کد / شناسه ملی"}>
                  <Grid container justifyContent={"flex-end"}>
                    <Typography fontSize={14}>
                      {convertDigits(
                        clientDetails?.data?.client?.national_number
                      )}
                    </Typography>
                  </Grid>
                </ClientInfo>
                <Box sx={{ position: "relative" }}>
                  {clientDetails?.data?.client?.agents.map((e, i) =>
                    i === 0 ? (
                      <ClientInfo
                        key={i}
                        infokey={"نماینده"}
                        handleClick={handleClickDropDown}
                      >
                        <Grid
                          container
                          justifyContent={"space-between"}
                          alignItems="center"
                        >
                          <Typography fontSize={14}>{e?.name}</Typography>
                          <PositionInfo>
                            <Typography fontSize={12}>{e?.position}</Typography>
                          </PositionInfo>
                        </Grid>
                      </ClientInfo>
                    ) : (
                      <ClientInfo
                        key={i}
                        infokey={"نماینده"}
                        dropDown={openDrop}
                      >
                        <Grid
                          container
                          justifyContent={"space-between"}
                          alignItems="center"
                        >
                          <Typography fontSize={14}>{e?.name}</Typography>
                          <PositionInfo>
                            <Typography fontSize={12}>{e?.position}</Typography>
                          </PositionInfo>
                        </Grid>
                      </ClientInfo>
                    )
                  )}
                </Box>

                <ClientInfo infokey={"شماره تماس"}>
                  <Grid container justifyContent={"flex-end"}>
                    <Typography fontSize={14}>
                      {convertDigits(clientDetails?.data?.client?.phone)}
                    </Typography>
                  </Grid>
                </ClientInfo>
                <ClientInfo infokey={"جلسات"}>
                  <Grid container justifyContent={"flex-end"}>
                    <Typography fontSize={14}>
                      {convertDigits(
                        clientDetails?.data?.cards?.meetings_count
                      )}
                    </Typography>
                  </Grid>
                </ClientInfo>
                <ClientInfo infokey={"تماس تلفنی"}>
                  <Grid container justifyContent={"flex-end"}>
                    <Typography fontSize={14}>
                      {convertDigits(clientDetails?.data?.cards?.calls_count)}
                    </Typography>
                  </Grid>
                </ClientInfo>

                <ClientInfo infokey={"مدت زمان جلسات (دقیقه)"}>
                  <Grid container justifyContent={"flex-end"}>
                    <Typography fontSize={14}>
                      {convertDigits(
                        clientDetails?.data?.cards?.meetings_duration
                      )}
                    </Typography>
                  </Grid>
                </ClientInfo>
                <ClientInfo infokey={"مدت زمان تماس تلفنی (دقیقه)"}>
                  <Grid container justifyContent={"flex-end"}>
                    <Typography fontSize={14}>
                      {convertDigits(
                        clientDetails?.data?.cards?.calls_duration
                      )}
                    </Typography>
                  </Grid>
                </ClientInfo>
                <ClientInfo infokey={"علاقمندی ها"}>
                  <Grid container justifyContent={"flex-start"} gap={2}>
                    {clientDetails?.data?.client?.interests.length === 0
                      ? "-"
                      : clientDetails?.data?.client?.interests?.map(
                          (item, i) => (
                            <Typography fontSize={14}>{item.title}</Typography>
                          )
                        )}
                  </Grid>
                </ClientInfo>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} sx={8} md={8}>
          <Card sx={{ padding: "16px" }}>
            <Grid container spacing={2}>
              {chartData.map((e, i) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={i === chartData.length - 1 ? 8 : 4}
                  key={i}
                >
                  <Card sx={{ background: e.background }}>
                    <LineChart
                      categories={e.categories}
                      status={statusDetail === "succeeded"}
                      series={e.series}
                      id={e.chart}
                      title={e.title}
                      type="line"
                      height={311}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Card>

          <Grid container>
            <Grid item xs={4}>
              <BoxButton
                value="لیست نمایندگان"
                background="#F6541E"
                handleClick={AgantList}
              >
                <img src={delagations} height={120} width={310} />
              </BoxButton>
            </Grid>
            <Grid item xs={4}>
              <BoxButton
                value="لیست جلسات"
                background="#DB2777"
                handleClick={meetingList}
              >
                <img src={meeting} height={120} width={310} />
              </BoxButton>
            </Grid>
            <Grid item xs={4}>
              <BoxButton
                value="لیست تماس ها"
                background="#2563EB"
                handleClick={callList}
              >
                <img src={call} height={120} width={310} />
              </BoxButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
