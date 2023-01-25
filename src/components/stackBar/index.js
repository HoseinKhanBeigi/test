import merge from "lodash/merge";
import ReactApexChart from "react-apexcharts";
// @mui
import { Card, CardHeader, Box } from "@mui/material";
import { convertDigits } from "persian-helpers";
import { useMemo, useState } from "react";
// components

export function StackBar({ categories, series,  status}) {
  const options = useMemo(() => {
    const res = {
      series: series,

      options: {
        chart: {
          type: "bar",
          // height: 350,
          stacked: true,
          toolbar: {
            show: false,
          },
        },
        // subtitle: {
        //   text: "سبد مشتریان",
        //   align: "right",
        //   margin: 0,
        //   offsetX: 0,
        //   offsetY: 30,
        //   floating: false,
        //   style: {
        //     fontSize: "12px",
        //     fontWeight: 400,
        //     color: "#000000",
        //   },
        // },
        dataLabels: {
          enabled: true,
          // textAnchor: "middle",
          position: "bottom",
          distributed: true,
          formatter: function (val) {
            return convertDigits(val);
          },
          offsetY: 0,
        },
        grid: {
          show: true,
          borderColor: "#90A4AE",
          strokeDashArray: 0,
          position: "back",
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
          row: {
            colors: undefined,
            opacity: 0.5,
          },
          column: {
            colors: undefined,
            opacity: 0.5,
          },
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },

        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "30%",
            barHeight: "100%",
            rangeBarOverlap: true,
            rangeBarGroupRows: false,
            dataLabels: {
              orientation: "vertical",
              position: "bottom", // bottom/center/top,
              total: {
                enabled: false,
                formatter: undefined,
                offsetX: 0,
                offsetY: 0,
                style: {
                  color: "#373d3f",
                  fontSize: "12px",
                  fontFamily: undefined,
                  fontWeight: 600,
                },
              },
            },
          },
        },
        stroke: {
          width: 0,
          colors: ["#fff"],
        },
        title: {
          // text: "Fiction Books Sales",
        },

        xaxis: {
          categories: categories,
          labels: {
            show: true,
          },
        },
        yaxis: {
          min: 1,
          max: 600,
          tickAmount: 20,

          title: {
            text: "سهم از  نوع مشتری",
            offsetX: -90,
          offsetY: 0,
            style: {
              color: "#017874",
              fontSize: "12px",
              fontWeight: 100,
              cssClass: "apexcharts-yaxis-title",
            },
          },
          labels: {
            show: false,
            align: "right",
            minWidth: 0,
            maxWidth: 160,
            style: {
              colors: [],
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 400,
              cssClass: "apexcharts-yaxis-label",
            },
            offsetX: 0,
            offsetY: 0,
            rotate: 0,
            formatter: (value) => {
              return value;
            },
          },
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return convertDigits(val);
            },
          },
        },
        fill: {
          opacity: 1,
          colors: ["#F7541E", "#A0CFF9", "#5041BC"],
        },
        legend: {
          show: true,
          position: "right",
          horizontalAlign: "center",
          offsetY: 45,
          markers: {
            onClick: function (chart, seriesIndex, opts) {
          
            },
            show: true,
            fillColors: ["#F7541E", "#A0CFF9", "#5041BC"],
            radius: 12,
          },
        },
      },
    };
    return res;
  }, [status]);

  const handleClick = (e) => {

  };
  return (
    <ReactApexChart
      options={options.options}
      series={options.series}
      type="bar"
      height={210}
      onClick={handleClick}
    />
  );
}
