import { Grid, Typography } from "@mui/material";
import { groupBy } from "../../../utils";

const entrirsTosys = [
  { day: "today", hour: "12:00", minute: "25 دقیقه" },
  { day: "today", hour: "13:10", minute: "25 دقیقه" },
  { day: "today", hour: "13:10", minute: "25 دقیقه" },
  { day: "tomorrow", hour: "12:00", minute: "25 دقیقه" },
  { day: "tomorrow", hour: "12:00", minute: "25 دقیقه" },
  { day: "tomorrow", hour: "12:00", minute: "25 دقیقه" },
  { day: "yesterday", hour: "13:10", minute: "25 دقیقه" },
  { day: "yesterday", hour: "12:00", minute: "25 دقیقه" },
  { day: "yesterday", hour: "12:00", minute: "25 دقیقه" },
  { day: "yesterday", hour: "12:00", minute: "25 دقیقه" },
  { day: "yesterday", hour: "12:00", minute: "25 دقیقه" },
  { day: "yesterday", hour: "12:00", minute: "25 دقیقه" },
  { day: "yesterday", hour: "12:00", minute: "25 دقیقه" },
];

export const CountOfEntry = () => {
  const subCategory = groupBy(entrirsTosys, "day");
  const days = Object.keys(subCategory);
  return (
    <>
      {days.map((e, i) => (
        <Grid container key={i}>
          <Grid container>
            <Typography>{e}</Typography>
          </Grid>
          {subCategory[e].map((k, j) => (
            <Grid container gap={10} sx={{ width: "70%" , borderBottom:"1px solid", borderColor:"silver"}}>
              <Typography color={"#777777"} key={j}>
                {k.hour}
              </Typography>
              <Typography color={"#777777"} key={j} align="right">
                {k.minute}
              </Typography>
            </Grid>
          ))}
        </Grid>
      ))}
    </>
  );
};
