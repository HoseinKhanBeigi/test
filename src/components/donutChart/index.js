import { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { convertDigits } from "persian-helpers";

export const DonutChart = ({series, labels,status}) => {
  const options = useMemo(() => {
    const opt = {
      series ,
      options: {
        chart: {
          type: "donut",
        },
        dataLabels: {
          
          formatter: function (val) {
            
            return `%${convertDigits(val)}`;
          },
          // offsetY: 0,
        },
        fill: {
          opacity: 1,
          colors: ["#F7541E", "#A0CFF9", "#5041BC"],
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return convertDigits(val);
            },
          },
        },
        labels,
        legend: {
          show: true,

          markers: {
            show: true,
            fillColors: ["#F7541E", "#A0CFF9", "#5041BC"],
            radius: 12,
          },
        },
      },
    };

    return opt;
  }, [status]);
  return (
    <ReactApexChart
      options={options.options}
      series={options.series}
      type="donut"
      width={260}
    />
  );
};
