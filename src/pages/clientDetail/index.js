import { HeaderPage } from "../../components/headerPage";
import { useTranslation } from "react-i18next";
import { Grid, Typography, Card } from "@mui/material";
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
import call from "./call.png";
import delagations from "./delagations.png";
import meeting from "./meeting.png";
import { useEffect } from "react";
import { clientDetail } from "../../actions/clients";
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
          data: rankValuesFirstLine,
        },
        {
          data: rankValuesSecondLine,
        },
      ],
      categories: rankCategories,
      title: "تغییر وضعیت متوسط رتبه مشتری",
      background: "#A0CFF9",
    },
    {
      chart: "services",
      series: [
        {
          data: rankServiceValuesFirstLine,
        },
        {
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
          data: rankAssingmentValuesFirstLine,
        },
        {
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
          data: rankEquipmentsFirstLine,
        },
        {
          data: rankEquipmentsValuesSecondLine,
        },
      ],
      categories: rankEquipmentsCategories,
      title: "تغییر وضعیت مشتری در حوزه خاص تجهیز",
      background: "#F7C3E0",
    },
    {
      chart: "totalScore",
      series: [
        {
          data: rankTotalFirstLine,
        },
        {
          data: rankTotalValuesSecondLine,
        },
      ],
      categories: rankTotalCategories,
      title: "تغییر امتیاز کل مشتری",
      background: "#A0CFF9",
    },
  ];
  return (
    <>
      <HeaderPage title={t("clientDetail")} page="dashboard" />
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
                value={clientDetails?.data?.client?.client_number}
                type={clientDetails?.data?.client?.bi_point}
                background="#C0DDC0"
                color="#777777"
              />
              <Grid container>
                <ClientHeaderButton name={"یادآوری"}>
                  <NotifyIconProile stroke={"white"} />
                </ClientHeaderButton>
                <ClientHeaderButton name={"جلسه"}>
                  <NotifyIconProile stroke={"white"} />
                </ClientHeaderButton>
                <ClientHeaderButton name={"تماس"}>
                  <Phone stroke={"white"} />
                </ClientHeaderButton>
                <ClientHeaderButton name={"یادداشت"}>
                  <NoteIcon stroke={"white"} />
                </ClientHeaderButton>
              </Grid>
              <Grid container flexDirection={"column"} gap={1}>
                <ClientInfo infokey={"کد / شناسه ملی"}>
                  <Grid container justifyContent={"flex-end"}>
                    <Typography fontSize={14}>
                      {clientDetails?.data?.client?.national_number}
                    </Typography>
                  </Grid>
                </ClientInfo>
                {clientDetails?.data?.client?.agents.map((e, i) => (
                  <ClientInfo key={i} infokey={"نماینده"}>
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
                ))}

                <ClientInfo infokey={"شماره تماس"}>
                  <Grid container justifyContent={"flex-end"}>
                    <Typography fontSize={14}>{clientDetails?.data?.client?.phone}</Typography>
                  </Grid>
                </ClientInfo>
                <ClientInfo infokey={"جلسات"}>
                  <Grid container justifyContent={"flex-end"}>
                    <Typography fontSize={14}>{clientDetails?.data?.cards?.meetings_count}</Typography>
                  </Grid>
                </ClientInfo>
                <ClientInfo infokey={"تماس تلفنی"}>
                  <Grid container justifyContent={"flex-end"}>
                    <Typography fontSize={14}>{clientDetails?.data?.cards?.calls_count}</Typography>
                  </Grid>
                </ClientInfo>

                <ClientInfo infokey={"مدت زمان جلسات (دقیقه)"}>
                  <Grid container justifyContent={"flex-end"}>
                    <Typography fontSize={14}>{clientDetails?.data?.cards?.meetings_duration}</Typography>
                  </Grid>
                </ClientInfo>
                <ClientInfo infokey={"مدت زمان تماس تلفنی (دقیقه)"}>
                  <Grid container justifyContent={"flex-end"}>
                    <Typography fontSize={14}>{clientDetails?.data?.cards?.calls_duration}</Typography>
                  </Grid>
                </ClientInfo>
                <ClientInfo infokey={"علاقمندی ها"}>
                  <Grid container justifyContent={"flex-start"} gap={2}>
                    <Typography fontSize={14}>{"ورزش"}</Typography>
                    <Typography fontSize={14}>{"رستوران"}</Typography>
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
              <BoxButton value="لیست نمایندگان" background="#F6541E">
                <img src={delagations} />
              </BoxButton>
            </Grid>
            <Grid item xs={4}>
              <BoxButton value="جلسات" background="#DB2777">
                <img src={meeting} />
              </BoxButton>
            </Grid>
            <Grid item xs={4}>
              <BoxButton value="تماس تلفنی" background="#2563EB">
                <img src={call} />
              </BoxButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
