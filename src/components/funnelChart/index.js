import React, { useRef, useEffect } from "react";
import { Card, Grid, CardHeader, Typography } from "@mui/material";
import D3Funnel from "d3-funnel";

export function FunnelChart({ subheader, title }) {
  const chartRef = useRef(null);
  var data = [
    { label: "test", value: 6000, backgroundColor: "#008080" },
    { label: "test", value: 3000, backgroundColor: "#702963" },
    { label: "test", value: 4500, backgroundColor: "#ff634d" },
  ];

  var options = {
    width: 200,
    height: 400,

    bottomWidth: 1 / 2,
    bottomPinch: 1, // How many sections to pinch
    isCurved: true, // Whether the funnel is curved
    curveHeight: 50, // The curvature amount
    fillType: "gradient", // Either "solid" or "gradient"
    isInverted: true, // Whether the funnel is inverted
    hoverEffects: true, // Whether the funnel has effects on hover
    fontSize: "18px",
    label: {
      format: "{l}\n{f}",
    },
  };

  useEffect(() => {
    const chart = new D3Funnel(chartRef.current);
    chart.draw(data, options);
  }, []);
  return (
    <Card sx={{ padding: "12px", left: 0 }}>
      <CardHeader title={title} subheader={subheader} />
      <Grid container justifyContent={"space-between"}>
        <Grid item>
          <Grid
            container
            flexDirection={"column"}
            alignContent="space-between"
            sx={{ justifyContent: "space-evenly", height: "100%" }}
          >
            {data.map((e, i) => (
              <Grid container item alignItems={"center"} key={i}>
                <LabelBox color={e.backgroundColor} />
                <Typography paddingRight={3}>{e.label}</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid
          item
          sx={{ height: "300px", position: "relative", width: "280px" }}
        >
          <div className="App" ref={chartRef} style={{ height: "280px" }}></div>
        </Grid>
      </Grid>
    </Card>
  );
}

const LabelBox = ({ color }) => {
  return (
    <div style={{ width: "16px", height: "16px", backgroundColor: color }} />
  );
};
