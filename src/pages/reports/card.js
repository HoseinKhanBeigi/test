import { Grid, Card, Typography } from "@mui/material";
import { UserIcon2 } from "../../components/icons";
import pic from "./pic.png";

export const CardBranch = ({ phone, address, name, level }) => {
  return (
    <Card sx={{minWidth:"500px"}}>
      <Grid container dir="rtl">
        <Grid item xs={6} paddingLeft="12px" paddingRight={"12px"}>
          <Grid container justifyContent={"space-between"} mb={2} mt={2}>
            <Typography color={"#000000"}>{`شعبه  ${name}`}</Typography>
            <Typography fontSize={"14px"} color="#3B3B3B">
              {level}
            </Typography>
          </Grid>
          <Grid container mb={2} mt={2}>
            <Grid item xs={2}>
              <Typography
                fontWeight={100}
                color="#777777"
              >{`آدرس:`}</Typography>
            </Grid>
            <Grid item xs={10} container>
              <Typography
                fontWeight={100}
                paddingLeft="12px"
                align="center"
                fontSize={"14px"}
              >
                {" "}
                {address}{" "}
              </Typography>
            </Grid>
          </Grid>
          <Grid container mb={2} mt={2}>
            <Typography
              fontWeight={100}
              fontSize={"14px"}
              color="#777777"
            >{`تلفن : `}</Typography>
            <Typography
              fontWeight={100}
              paddingLeft="12px"
              align="center"
              fontSize={"14px"}
            >
              {phone}
            </Typography>
          </Grid>
          {/* <Grid container gap={2}>
          <Typography fontSize={"14px"}  sx={{background:"#F7C3E0",borderRadius:"8px", padding:"4px"}}>{"ریالی"}{" "}</Typography>
          <Typography fontSize={"14px"} sx={{background:"#C0DDC0",borderRadius:"8px", padding:"4px"}}>{"ارزی"}{" "}</Typography>
        </Grid> */}
        </Grid>
        <Grid item xs={6}>
          <img src={pic} style={{ height: "100%" }} />
        </Grid>
      </Grid>
    </Card>
  );
};

export const UserCard = ({name,position,organization,mobile}) => {
  return (
    <Card sx={{minWidth:"500px"}}>
      <Grid
        container
        dir="rtl"
        justifyContent={"space-between"}
        alignItems="center"
        paddingLeft="12px"
        paddingRight={"12px"}
        paddingTop={"12px"}
        mb={4}
        gap={4}
      >
        <Typography>{ `${name}(${position})`}</Typography>
        <UserIcon2 />
      </Grid>
      <Grid
        container
        dir="rtl"
        paddingLeft="12px"
        paddingRight={"12px"}
        justifyContent={"space-between"}
        paddingBottom={"12px"}
      >
        <Grid container item xs={6}>
          <Typography>{"تلفن :"}</Typography>
          <Typography>{mobile}</Typography>
        </Grid>
        <Grid item container xs={6} justifyContent="end">
          <Typography>{`${organization}`}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
};
