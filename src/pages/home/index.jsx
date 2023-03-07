import * as React from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import { Card, Divider } from "@mui/material";
import { convertDigits } from "persian-helpers";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { HeaderPage } from "../../components/headerPage";
import { DatePicker } from "../../components/datepicker";
import { AreaChart } from "../../components/areaChart";
import { StackBar } from "../../components/stackBar";
import { NoteForm } from "../../components/noteDialog";
import { DirectClients } from "../../components/cardDashboard/DirectClient";
import { TargetCard } from "../../components/cardDashboard/targetCard";
import { MeetingCard } from "../../components/cardDashboard/meetingCard";
import { NoteCard } from "../../components/cardDashboard/noteCard";
import { handleLoading } from "../../features/loading";

export const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleInsertMeeting = () => {
    if (
      entitiesDashboard?.data?.user.super_admin === 1 ||
      entitiesDashboard?.data?.user.permissions.some(
        (e) => e.name === "meeting_create"
      )
    ) {
      navigate("/interactions/meetings/create");
    }
  };

  const handleToNote = () => {
    if (
      entitiesDashboard?.data?.user.super_admin === 1 ||
      entitiesDashboard?.data?.user.permissions.some((e) => e.name === "note")
    ) {
      navigate("/notes");
    }
  };

  const handleToIntraction = () => {
    navigate("/interactions");
  };

  const {
    statusDashboard,
    entitiesDashboard,
    areaChartCategories,
    areaChartValues,
    basketClient,
    categories,
    error,
  } = useSelector((state) => state.dashboardAppSlice);

  React.useEffect(() => {
    dispatch(handleLoading({ status:statusDashboard }));
  }, [statusDashboard]);


  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClick = () => {
    setOpenDialog(true);
  };

  return (
    <>
      <NoteForm
        open={openDialog}
        setOpen={setOpenDialog}
        title="یادداشت جدید"
        page="home"
      />
      <HeaderPage title={t("workOfTable")} page="dashboard" />
      <Grid
        container
        justifyContent="center"
        dir="rtl"
        columns={{ xs: 4, md: 12 }}
        columnSpacing={{ xs: 2, sm: 2, md: 3 }}
        rowSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item md={8} lg={8} sm={6} xs={12}>
          <AreaChart
            title={t("TheAmountOfClientsCategoryChanges")}
            status={statusDashboard === "succeeded"}
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

          <Grid container mb={2} mt={2} columnSpacing={2}>
            <Grid item md={5} lg={5} sm={5} xs={12}>
              <DirectClients
                count={convertDigits(
                  entitiesDashboard?.data?.client_count_chart?.clients_count
                )}
                percent={convertDigits(
                  entitiesDashboard?.data?.client_count_chart?.clients_percent
                )}
                status={statusDashboard === "succeeded"}
              />
            </Grid>
            <Grid item md={7} lg={7} sm={7} xs={12}>
              <TargetCard />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={7} lg={7} sm={6} xs={12}>
              <Card>
                <Typography sx={{ paddingLeft: "16px", paddingTop: "12px" }}>
                  {t("clinetsBasket")}
                </Typography>
                <StackBar
                  categories={categories}
                  series={basketClient}
                  status={statusDashboard === "succeeded"}
                />
              </Card>
            </Grid>
            <Grid item md={5} lg={5} sm={6} xs={12}>
              <NoteCard
                handleToPage={handleToNote}
                notes={entitiesDashboard?.data?.notes}
                status={statusDashboard === "succeeded"}
                handleClick={handleClick}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4} lg={4} sm={6} xs={12} order={{ xs: 1, sm: 1, md: 1 }}>
          <Card sx={{ padding: "20px", height: "100%" }}>
            <DatePicker entitiesDashboard={entitiesDashboard} />
            <Divider />
            <MeetingCard
              handleClick={handleInsertMeeting}
              handleToPage={handleToIntraction}
              meetings={entitiesDashboard?.data?.meetings}
              status={statusDashboard === "succeeded"}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
