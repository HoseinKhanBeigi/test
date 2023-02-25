import { Grid, Typography, Card } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { convertDigits } from "persian-helpers";
import {
  CountMeetinIcon,
  TimeClock,
  EnterIcone,
  Users,
  Clients,
  AnalysisIcon,
  Phone,
  Decoration,
  Decoration2,
  ClientIcone,
  InteractionsLogo,
  UserIcon,
} from "../../../components/icons";
import { StackBar } from "../../../components/stackBar";
import { CountOfEntry } from "../../../components/cards/detialUser";
import { styled } from "@mui/material/styles";
import { CardDetail, CardButtom } from "./Card";
import { AreaChart } from "../../../components/areaChart";
import { LineChart } from "../../../components/lineChart";
import { DonutChart } from "../../../components/donutChart";
import { userChildrenAction, userDetail } from "../../../actions/users";
import { HeaderPage } from "../../../components/headerPage";

const DecorationStyle = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

export const DetailReports = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const {
    statusDetail,
    basketClient,
    cards,
    areaChartCategories,
    areaChartValues,
    lineChartCategories,
    lineChartValues,
    donatChartLabels,
    donatChartValues,
    userDetails,
  } = useSelector((state) => state.userDetailShow);

  useEffect(() => {
    const id = params.id;
    if (statusDetail === "idle") {
      dispatch(
        userDetail({
          id,
        })
      );
    }
  }, [statusDetail, dispatch]);
  const categories = ["حقوقی", "حقیقی"];

  const series = [
    {
      name: " ",
      data: lineChartValues,
    },
  ];

  const handleRoute = (value) => {
    const id = params.id;
    dispatch(
      userChildrenAction({
        id,
        params: { level: userDetails?.data?.user.level },
      })
    ).then(() => {
      navigate(value);
    });
  };

  return (
    <>
      <HeaderPage
        title={"گزارش ها"}
        page="detail"
        entities={userDetails?.data?.user}
        status={statusDetail}
      />
      <Grid container gap={2}>
        <Grid container dir={"rtl"} spacing={2}>
          <Grid container item xs={12} sm={6} md={6}>
            <Grid container spacing={2}>
              <Grid item lg={6} sm={12} xs={12}>
                <CardDetail
                  title={"تعداد تماس های تلفنی ثبت شده"}
                  value={convertDigits(cards?.calls_count)}
                >
                  <Phone stroke="white" />
                </CardDetail>
              </Grid>
              <Grid item lg={6} sm={12} xs={12}>
                <CardDetail
                  title={"میزان زمان صرف شده در سامانه"}
                  value={convertDigits(cards?.calls_duration)}
                >
                  <TimeClock stroke="white" />
                </CardDetail>
              </Grid>
              <Grid item lg={6} sm={12} xs={12}>
                <CardDetail
                  title={"تعداد جلسات برگزار شده ثبت شده"}
                  value={convertDigits(cards?.meetings_count)}
                >
                  <CountMeetinIcon stroke="white" />
                </CardDetail>
              </Grid>
              <Grid item lg={6} sm={12} xs={12}>
                <CardDetail
                  title={" مدت زمان جلسه (دقیقه)"}
                  value={convertDigits(cards?.meetings_duration)}
                >
                  <TimeClock stroke="white" />
                </CardDetail>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Grid container spacing={2}>
              <Grid item lg={6} sm={12} xs={12}>
                <CardDetail
                  title={"فراوانی طبقه مشتریان اختصاص داده شده"}
                  value={
                    <Box>
                      <DonutChart
                        series={donatChartValues}
                        labels={donatChartLabels}
                        type="donut"
                        width={260}
                        status={statusDetail === "succeeded"}
                      />
                    </Box>
                  }
                >
                  <AnalysisIcon stroke="white" />
                </CardDetail>
              </Grid>
              <Grid item lg={6} sm={12} xs={12}>
                <CardDetail
                  title={"تغییر وضعیت متوسط رتبه مشتریان "}
                  value={
                    <LineChart
                      categories={lineChartCategories}
                      series={series}
                      type="line"
                      status={statusDetail === "succeeded"}
                    />
                  }
                >
                  <AnalysisIcon stroke="white" />
                </CardDetail>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} dir={"rtl"}>
          <Grid item xs={12} sm={6} md={6} lg={9}>
            <Card sx={{ height: "100%" }}>
              <Grid
                container
                sx={{ height: "100%" }}
                alignItems={"center"}
                gap={4}
              >
                <DecorationStyle item xs={12} sm={12} md={2}>
                  <Decoration />
                </DecorationStyle>
                <Grid item xs={12} sm={3} md={3} lg={2}>
                  <CardButtom
                    title={"مدیران ارتباط"}
                    keyRoute="users"
                    background="#2563EB"
                    handleRoute={() => handleRoute("children")}
                  >
                    <Users stroke={"#fff"} />
                  </CardButtom>
                </Grid>
                <Grid item xs={12} sm={3} md={3} lg={2}>
                  <CardButtom
                    title={"جلسات"}
                    background="#5041BC"
                    keyRoute={"interactions/meetings"}
                    handleRoute={() => handleRoute("meetings")}
                  >
                    <InteractionsLogo stroke={"#fff"} />
                  </CardButtom>
                </Grid>
                <Grid item xs={12} sm={3} md={3} lg={2}>
                  <CardButtom
                    title={"مشتریان"}
                    background="#F6541E"
                    keyRoute={"clients"}
                    handleRoute={() => handleRoute("clients")}
                  >
                    <Clients stroke={"#fff"} />
                  </CardButtom>
                </Grid>
                <DecorationStyle item xs={12} sm={12} md={2}>
                  <Decoration2 />
                </DecorationStyle>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <CardDetail
              title={"سبد مشتریان"}
              value={
                <StackBar
                  categories={categories}
                  series={basketClient}
                  status={statusDetail === "succeeded"}
                />
              }
            >
              <AnalysisIcon stroke="white" />
            </CardDetail>
          </Grid>
        </Grid>
        <Grid container spacing={2} dir={"rtl"}>
          <Grid item xs={12} sm={4} md={4}>
            <CardDetail
              title={"میزان زمان صرف شده در سامانه"}
              value={<CountOfEntry />}
              scroll
            >
              <EnterIcone stroke="white" />
            </CardDetail>
          </Grid>
          <Grid item xs={12} sm={8} md={8}>
            <AreaChart
              title="میزان تغییرات دسته مشتریان"
              status={statusDetail === "succeeded"}
              areaChartCategories={areaChartCategories}
              chartData={[
                {
                  name: "تغییرات",
                  type: "area",
                  fill: "gradient",
                  data: areaChartValues,
                },
              ]}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
