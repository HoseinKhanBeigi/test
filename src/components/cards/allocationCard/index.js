import * as React from "react";
import { Card, Grid, CardHeader } from "@mui/material";

import { LineTarget, RectTangle1, RectTangle3 } from "../../icons";
import Tooltip from "@mui/material/Tooltip";

export const AllocationCard = ({ title, subheader }) => {
  const data = [
    { count: 8, width: "78px", color: "#A0CFF9", label: "test" },
    { count: 8, width: "228px", color: "#EFF3F3", label: "test" },
    { count: 8, width: "278px", color: "#C0DDC0", label: "test" },
    { count: 8, width: "178px", color: "#F7C3E0", label: "test" },
  ];
  const positionRef = React.useRef({
    x: 0,
    y: 0,
  });
  const popperRef = React.useRef(null);
  const areaRef = React.useRef(null);
  const handleMouseMove = (event) => {
    positionRef.current = { x: event.clientX, y: event.clientY };

    if (popperRef.current != null) {
      popperRef.current.update();
    }
  };
  return (
    <Card sx={{ minWidth: "820px" }}>
      <CardHeader title={title} subheader={subheader} />
      <Grid
        container
        sx={{ position: "relative", width: "100%" }}
        flexDirection="row-reverse"
        justifyContent="center"
      >
        {data.map((e ,i) => (
          <Bar
          key={i}
            count={e.count}
            width={e.width}
            color={e.color}
            label={e.label}
          />
        ))}
      </Grid>
      <Grid
        container
        sx={{ position: "relative", width: "100%" }}
        justifyContent="center"
      >
        <Grid item sx={{ position: "relative" }} mb={4} mt={24}>
          <Grid item>
            <RectTangle1 heightSvg={35} heightRect={25} />
          </Grid>
          <Tooltip
            title="17"
            placement="top"
            arrow
            PopperProps={{
              popperRef,
              anchorEl: {
                getBoundingClientRect: () => {
                  return new DOMRect(
                    positionRef.current.x,
                    areaRef.current.getBoundingClientRect().y,
                    0,
                    0
                  );
                },
              },
            }}
          >
            <Grid
              item
              sx={{ position: "absolute", top: "12px", left: "6px" }}
              ref={areaRef}
              onMouseMove={handleMouseMove}
            >
              <RectTangle3 width={190} />
            </Grid>
          </Tooltip>
          <Grid item sx={{ position: "absolute", top: 0, left: "400px" }}>
            <LineTarget />
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

const Bar = ({ count, width, color, label }) => {
  return (
    <div>
      {label}
      <div
        style={{
          width: width,
          height: "30px",
          background: color,
          paddingRight: "12px",
          paddingTop: "5px",
        }}
      >
        {count}
      </div>
    </div>
  );
};
