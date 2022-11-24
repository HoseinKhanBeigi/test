import * as React from "react";
import { Grid } from "@mui/material";
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import { AppDashboard } from "../../components/dashboard";
import TextField from "@mui/material/TextField";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { UserIcon, Polygon1, Polygon2, Polygon3 } from "../../components/icons";
// import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from "@mui/material/InputAdornment";
import { AllocationCard } from "../../components/cards/allocationCard";
import { FunnelChart } from "../../components/funnelChart";
export const CompareUser = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container dir="rtl" spacing={2}>
      <Grid item xs={12} md={6} lg={8}>
        <AppDashboard
          title="Website Visits"
          subheader="(+43%) than last year"
          chartLabels={[
            "01/01/2003",
            "02/01/2003",
            "03/01/2003",
            "04/01/2003",
            "05/01/2003",
            "06/01/2003",
            "07/01/2003",
            "08/01/2003",
            "09/01/2003",
            "10/01/2003",
            "11/01/2003",
          ]}
          chartData={[
            {
              name: "Team A",
              type: "column",
              fill: "solid",
              data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
            },
            {
              name: "Team B",
              type: "area",
              fill: "gradient",
              data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
            },
            {
              name: "Team C",
              type: "line",
              fill: "solid",
              data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
            },
          ]}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Card sx={{ padding: "12px" }}>
     
            <Grid container alignItems={"end"} mb={2}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Item One" value="1" />
                    <Tab label="Item Two" value="2" />
                  </TabList>
                </Box>
              </TabContext>
              <TextField
                id="standard-basic"
                variant="standard"
                placeholder="name"
                sx={{ paddingRight: "45px" }}
              />
            </Grid>
            <Grid sx={{ height: "400px", overflowY: "scroll", width: "100%" }}>
              {[1, 2, 3, 4, 5, 2, 2, 2].map((e, i) => (
                <Grid
                  key={i}
                  container
                  item
                  justifyContent={"space-around"}
                  alignContent="center"
                  alignItems={"center"}
                  mb={4}
                >
                  <UserIcon />
                  <Typography>name</Typography>
                  <Typography>name</Typography>
                  <Typography>12</Typography>
                </Grid>
              ))}
            </Grid>
     
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={5}>
        <FunnelChart title="Website Visits" subheader="(+43%) than last year" />
      </Grid>
      <Grid item xs={12} md={6} lg={7}>
        <AllocationCard
          title="Website Visits"
          subheader="(+43%) than last year"
        />
      </Grid>
    </Grid>
  );
};
