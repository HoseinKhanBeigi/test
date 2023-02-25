import { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { convertDigits } from "persian-helpers";

export const LineChart = ({
  series,
  categories,
  id,
  title,
  height,
  status,
}) => {
  const option = useMemo(() => {
    const opt = {
      series: series,
      options: {
        chart: {
          id: `fb${id}`,
          toolbar: {
            show: false,
          },
          colors: ["#008FFB"],
        },
        stroke: {
          width: 3,
        },
        title: {
          text: title,
          align: "center",
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "14px",
            fontFamily: undefined,
            color: "#263238",
          },
        },

        xaxis: {
          categories,
          labels: {
            offsetY: 0,
            offsetX: -4,
            // maxHeight:100,
            hideOverlappingLabels: true,
            formatter: (value) => {
              switch (value) {
                case "01":
                  return "فروردین";
                case "02":
                  return "اردیبهشت";
                case "03":
                  return "خرداد";
                case "04":
                  return "تیر";
                case "05":
                  return "مرداد";
                case "06":
                  return "شهریور";
                case "07":
                  return "مهر";
                case "08":
                  return "آبان";
                case "09":
                  return "آذر";
                case "10":
                  return "دی";
                case "11":
                  return "بهمن";
                case "12":
                  return "اسفند";
              }
            },
            rotate: 45,
            rotateAlways: true,
            style: {
              colors: [],
              fontSize: "12px",
              // position:"absolute",
              // top:0
            },
          },
        },
        yaxis: {
          show: false,
        },
        legend: {
          show: true,
          showForSingleSeries: false,
          showForNullSeries: true,
          showForZeroSeries: true,
          position: "bottom",
          horizontalAlign: "center",
          floating: false,
          fontSize: "14px",
          fontFamily: "Helvetica, Arial",
          fontWeight: 400,
          formatter: (value) => {
            if (value === "series-1") {
              return "مشتری";
            }
            if (value === "series-2") {
              return "متوسط گروه";
            } else {
              return value;
            }
          },
          inverseOrder: false,
          width: undefined,
          height: undefined,
          tooltipHoverFormatter: undefined,
          customLegendItems: [],
          offsetX: 0,
          offsetY: 0,
          labels: {
            colors: undefined,
            useSeriesColors: false,
          },
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return convertDigits(val);
            },
          },
          marker: {
            show: false,
        },
        },
        grid: {
          show: true,
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
          row: {
            colors: ["#f6f6f6", "white"],
            opacity: 0.5,
          },
          column: {
            colors: ["#f6f6f6", "white"],
            opacity: 0.5,
          },
        },
      },
    };
    return opt;
  }, [status]);
  return (
    <ReactApexChart
      options={option.options}
      series={option.series}
      type="line"
      height={height}
    />
  );
};
