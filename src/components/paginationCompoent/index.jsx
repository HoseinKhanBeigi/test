import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { convertDigits } from "persian-helpers";
import IconButton from "@mui/material/IconButton";
export const PersianPagination = ({}) => {
    const length = 20;
  return (
    <Grid container>
      {Array.from({ length }, (_, i) => i + 1).map((e, i) => (
        <IconButton
          sx={{ p: "10px" }}
          aria-label="menu"
          // onClick={handleDrawerOpen}
        >
            {length >= 10 }
          <Box>
            <Typography>{convertDigits(e)}</Typography>
          </Box>
        </IconButton>
      ))}
    </Grid>
  );
};
