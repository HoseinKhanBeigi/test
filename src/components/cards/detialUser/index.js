import { Grid, Typography } from "@mui/material";
import { groupBy } from "../../../utils";

const entrirsTosys = [
  { day: "امروز", hour: "12:00", minute: "25 دقیقه" },
  { day: "امروز", hour: "13:10", minute: "25 دقیقه" },
  { day: "امروز", hour: "13:10", minute: "25 دقیقه" },
  { day: "دیروز", hour: "13:10", minute: "25 دقیقه" },
  { day: "دیروز", hour: "12:00", minute: "25 دقیقه" },
  { day: "دیروز", hour: "12:00", minute: "25 دقیقه" },

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
