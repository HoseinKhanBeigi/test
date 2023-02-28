import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { Dlogo, PathIcone } from "../../icons";

const BoxMenu = styled(Box)(({ theme, menuWidth }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: menuWidth ? "211px" : "90px",
}));
const BoxMenuItem = styled(Box)(({ theme, height, justifyContent }) => ({
  transition: theme.transitions.create("height", {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  height,
  display: "flex",
  flexDirection: "column",
  justifyContent,
  alignItems: "center",
}));

const BoxItem = styled(Box)(
  ({ theme, background, marginTop, marginBottom, menuWidth }) => ({
    width: "2.3rem",
    height: "2.3rem",

    ...(menuWidth && {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      padding: "12px",
      width: "10.3rem",
    }),
    display: "flex",
    alignItems: "center",
    justifyContent: menuWidth ? "space-between" : "center",
    marginTop,
    marginBottom,
    borderRadius: "8px",
    background,
    cursor: "pointer",
  })
);

export const Drawer = ({ navbarList, handleClick, entitiesDashboard, t }) => {
  const theme = useTheme();
  return (
    <BoxMenu menuWidth={navbarList.menuWidth}>
      <BoxMenuItem
        height={!navbarList.menuWidth ? "12%" : "18%"}
        justifyContent="space-evenly"
      >
        {navbarList.one.values.map((E, i) => (
          <E.Logo
            key={i}
            stroke={"#ffffff"}
            style={{
              transform: "scale(2)",
            }}
          />
        ))}
        {navbarList.menuWidth && (
          <Box
            sx={{
              width: "11.3rem",
              height: "2.6rem",
              background: "#E5FFF6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
            }}
          >
            <Typography paddingLeft={"7px"}>
              {`${entitiesDashboard?.data?.user?.name}  `}
            </Typography>
          </Box>
        )}
      </BoxMenuItem>
      {navbarList.menuWidth && <PathIcone />}

      <BoxMenuItem height={!navbarList.menuWidth ? "76%" : "70%"}>
        {navbarList.two.values.map(
          (E, i) =>
            (entitiesDashboard?.data?.user?.super_admin === 1 ||
              entitiesDashboard?.data?.user?.permissions.some((j) => {
                if (E?.id === "home") {
                  return true;
                }
                return j.name === E?.name;
              })) && (
              <BoxItemComponent
                E={E}
                navbarList={navbarList}
                t={t}
                handleClick={handleClick}
                theme={theme}
                key={i}
              />
            )
        )}
      </BoxMenuItem>
      <BoxMenuItem height={"12%"} justifyContent="space-evenly">
        {navbarList.three.values.map((E, i) => {
          return (
            E.show && (
              <BoxItem
                marginTop="0.2rem"
                marginBottom="0.2rem"
                menuWidth={navbarList.menuWidth}
                onClick={() => handleClick(E, "three", E.id)}
                background={E.status ? "#E5FFF6" : theme.palette.primary.main}
              >
                {navbarList.menuWidth && (
                  <Typography color={E.status ? "#017874" : "white"}>
                    {t(E?.path)}
                  </Typography>
                )}
                <E.Logo
                  key={i}
                  stroke={E.status ? theme.palette.primary.main : "#ffffff"}
                  style={{
                    transform: "scale(2)",
                  }}
                />
              </BoxItem>
            )
          );
        })}
      </BoxMenuItem>
    </BoxMenu>
  );
};

const BoxItemComponent = ({ E, navbarList, t, handleClick, theme }) => {
  return (
    <BoxItem
      marginTop="1.1rem"
      marginBottom="1.1rem"
      onClick={() => handleClick(E, "two")}
      background={E.status ? "#E5FFF6" : theme.palette.primary.main}
      menuWidth={navbarList.menuWidth}
    >
      {navbarList.menuWidth && (
        <Typography color={E.status ? "#017874" : "white"}>
          {t(E.id)}
        </Typography>
      )}
      <E.Logo
        stroke={E.status ? theme.palette.primary.main : "#ffffff"}
        style={{
          transform: "scale(2)",
        }}
      />
    </BoxItem>
  );
};
