import ReactApexChart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
import { Card, Box } from "@mui/material";
import { useMemo, useState } from "react";
import { convertDigits } from "persian-helpers";
import { BaseOptionChartStyle } from "../chart";

export function AreaChart({
  title,
  subheader,
  chartLabels,
  chartData,
  areaChartCategories,
  status,
  ...other
}) {
  const theme = useTheme();
  let arr = "";

  const options = useMemo(() => {
    const option = {
      colors: [theme.palette.primary.main],
      chart: {
        toolbar: { show: false },
        zoom: { enabled: false },
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      noData: {
        text: "Loading...",
      },
      series:  chartData,

      subtitle: {
        text: "میزان تغییرات دسته مشتریان",
        align: "right",
        margin: 0,
        offsetX: 0,
        offsetY: 10,
        floating: false,
        style: {
          fontSize: "16px",
          fontWeight: 400,
          color: "#017874",
        },
      },
      plotOptions: { bar: { columnWidth: "16%" } },
      fill: { type: "gradient" },
      labels: chartLabels,
      xaxis: {
        show: status,
        categories:  areaChartCategories,
        labels: {
          show: true,
          formatter: function (val) {
            return convertDigits(val);
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      yaxis: {
        show: true,
        tickAmount: 7,
        min: 1,
        max: Math.max(...chartData[0]?.data),
        forceNiceScale: false,
        floating: false,
        decimalsInFloat: undefined,
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,

          offsetX: 0,
          offsetY: 0,
          rotate: 0,
          formatter: (value) => {
            arr += " " + value;
            const result = [...new Set(arr.split(" ").filter((e) => e !== ""))];
            if (value >= result[0]) {
              return "A*";
            } else if (value >= result[1]) {
              return "A+";
            } else if (value >= result[2]) {
              return "A";
            } else if (value >= result[3]) {
              return "B+";
            } else if (value >= result[4]) {
              return "B";
            } else if (value >= result[5]) {
              return "C";
            } else if (value >= result[6]) {
              return "D";
            } else if (value >= result[7]) {
              return "E";
            }
          },
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        x: {
          show: false,
          format: "dd MMM",
          // formatter:(value)=>{
          //   console.log(value);
          //   return value
          // }
          // formatter: (value) => {
          //   console.log(value);
          //   switch (value) {
          //     case 1:
          //       return "فروردین";
          //     case 2:
          //       return "اردیبهشت";
          //     case 3:
          //       return "خرداد";
          //     case 4:
          //       return "تیر";
          //     case 5:
          //       return "مرداد";
          //     case 6:
          //       return "شهریور";
          //     case 7:
          //       return "مهر";
          //     case 8:
          //       return "آبان";
          //     case 9:
          //       return "آذر";
          //     case 10:
          //       return "دی";
          //     case 11:
          //       return "بهمن";
          //     case 12:
          //       return "اسفند";
          //   }
          // },
        },
        y: {
          formatter: (value) => {
            return `${convertDigits(value)}%`;
          },
        },
      },
    };

    return option;
  }, [status]);

  return (
    <Card {...other}>
      <Box dir="ltr">
        <ReactApexChart
          type="area"
          series={options.series}
          options={options}
          height={382}
        />
      </Box>
    </Card>
  );
}
