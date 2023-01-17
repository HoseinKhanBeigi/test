import { Grid, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import { Targets } from "../../components/targets";
import {
  SettingIcon,
  Star,
  TargetIcon,
  AvatarButton,
} from "../../components/icons";
import Badge from "@mui/material/Badge";
import { ProfileDialog } from "../../components/profileDialog";
import { useState } from "react";

export const Profile = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid container>
      <Box
        sx={{
          background:
            "linear-gradient(141.51deg, #FF7043 -18.34%, #EC407A 66.03%);",
          width: "100%",
          height: "200px",
          borderBottomRightRadius: "90px",
          borderTopLeftRadius: "90px",
          borderBottomLeftRadius: "90px",
          display: "flex",
        }}
        paddingLeft={2}
        paddingRight={8}
        mt={3}
      >
        <Grid container>
          <Grid
            item
            container
            md={10}
            lg={10}
            sm={12}
            alignItems="center"
            alignContent={"center"}
          >
            <Grid container item xs={6} alignItems={"center"} mb={2}>
              <IconButton
                aria-label="menu"
                sx={{ padding: 0 }}
                onClick={handleClickOpen}
              >
                <SettingIcon />
              </IconButton>
            </Grid>
            <Grid item xs={6}>
              <Typography color={"white"} align="end">
                {"مهدی سیف علی شاهی"}
              </Typography>
            </Grid>

            <Grid container alignItems={"center"} mt={2} item xs={6}>
              <Star />
            </Grid>
            <Grid item xs={6}>
              <Typography color={"white"} align="end">
                {"2727"}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            md={2}
            lg={2}
            sm={12}
            justifyContent="flex-end"
            mt={2}
          >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              badgeContent={
                <IconButton
                  aria-label="menu"
                  sx={{ padding: 0, top: "-20px" }}

                  //   onClick={() => handleDelete(row.id)}
                >
                  <AvatarButton />
                </IconButton>
              }
            >
              <Avatar sx={{ width: 166, height: 166 }}>H</Avatar>
            </Badge>
          </Grid>
        </Grid>
      </Box>
      <Grid container mt={4} mr={4}>
        <Box
          sx={{
            width: "100px",
            height: "100px",
            borderColor: "#FF7043",
            borderRadius: "50px",
            borderStyle: "solid",
            display: "flex",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TargetIcon />
        </Box>
      </Grid>
      <Grid container sx={{ position: "relative" }} mt={3}>
        <Box
          sx={{
            position: "absolute",
            height: "380px",
            width: "5px",
            background: "#F7C3E0",
            left: "102px",
            zIndex: "-1",
          }}
        />
        <Targets top={41} />
        {/* <Targets top={71}/>
        <Targets top={101}/> */}
      </Grid>
      <ProfileDialog handleClose={handleClose} open={open} />
    </Grid>
  );
};
