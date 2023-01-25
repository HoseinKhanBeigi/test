import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const BoxButtom = styled(Button)(({ theme, checked }) => ({
  background: checked ? theme.palette.primary.main : "white",
  color: checked ? "white" : theme.palette.primary.main,
}));

export const TabButtons = ({ ButtonTabs, handleButtons }) => {
  const {t}= useTranslation();
  return (
    <Grid container flexDirection={"row-reverse"} sx={{ width: "732px" }}>
      {ButtonTabs.map((item, i) => (
        <BoxButtom key={i} onClick={() => handleButtons(item)} checked={item.checked}>
          {t(item.name)}
        </BoxButtom>
      ))}
    </Grid>
  );
};
