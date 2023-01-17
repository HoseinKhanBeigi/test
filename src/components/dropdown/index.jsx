import ListItemButton from "@mui/material/ListItemButton";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { Typography } from "@mui/material";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import { Checkbox } from "@mui/material";
import { useTranslation } from "react-i18next";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";

export const DropDown = ({
  open,
  handleClick,
  data,
  defaultQuery,
  handleChangeCheckBox,
  handleChangeRadio,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        dir="rtl"
        sx={{ justifyContent: "space-between", marginTop: "16px" }}
      >
        <Typography> {t(`${data.title}`)}</Typography>

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto">
        <List component="div" disablePadding sx={{ marginBottom: "16px" }}>
          {data.values.map((e, i) => {
            return (
              <Grid
                key={i}
                container
                alignItems={"center"}
                justifyContent="flex-end"
              >
                <Typography>{t(`${e.title}`)}</Typography>
                {data.inputType === "CHECKBOX" ? (
                  <Checkbox
                    checked={e.checked}
                    onChange={() => handleChangeCheckBox(e)}
                  />
                ) : (
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="type"
                    value={e.title}
                    checked={e.checked}
                    onChange={() => handleChangeRadio(e)}
                  >
                    <FormControlLabel
                      defaultValue={defaultQuery.type}
                      checked={e.checked}
                      value={e.checked && e.title}
                      control={<Radio />}
                    />
                  </RadioGroup>
                )}
              </Grid>
            );
          })}
        </List>
        <Divider />
      </Collapse>
    </>
  );
};
