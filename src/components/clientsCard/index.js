import { Grid } from "@mui/material";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    // marginLeft:theme.spacing(8),
    // marginRight:theme.spacing(8)
  }));

export const ClientCard = ()=>{
    return(
        <Grid>
            <Item>asdasd</Item>
        </Grid>
    )
}