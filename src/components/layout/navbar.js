import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

const ItemMenu = styled(Grid, {
  shouldForwardProp: (prop) => prop !== "openwidth",
})(({ theme, openwidth }) => ({
  ...(openwidth && {}),

  width: openwidth ? "144px" : "2.3rem",
  height: openwidth ? "42px" : "2.3rem",
  justifyContent: "space-around",
  alignItems: "center",
  borderRadius: "8px",
  transition: "width 2s  height 2s linear",

  display: "flex",
}));

export const NavbarSideSuperAdmin = ({
  navbarList,
  handleClick,
  statusDashboard,
  entitiesDashboard,
  isDesktop,
  openwidth,
  t,
}) => {
  const theme = useTheme();
  return (
    <>
      {navbarList.map((E) => {
        {
          return openwidth && E.id === "logo" ? (
            <li
              style={{
                background: `${
                  E.status ? "#E5FFF6" : theme.palette.primary.main
                }`,
                display: "flex",
                width: "144px",
                height: "142px",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "8px",
              }}
              data-name="logo"
            >
              <Box style={{ width: "1.3rem", height: "1.3rem" }}>
                <E.Logo
                  stroke={E.status ? theme.palette.primary.main : "#ffffff"}
                  style={{
                    transform: "scale(3.5)",
                    position: "relative",
                    top: "47px",
                    transition: "transform 2s linear 1s",
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: "144px",
                  height: "42px",
                  background: "rgb(229, 255, 246)",
                  position: "relative",
                  top: "102px",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography color={theme.palette.primary.main}>
                  {statusDashboard === "succeeded" &&
                    entitiesDashboard?.data?.user?.name}
                </Typography>
              </Box>
            </li>
          ) : isDesktop === true ? (
            <ItemMenu
              sx={{
                background: `${
                  E.status ? "#E5FFF6" : theme.palette.primary.main
                }`,
                cursor: "pointer",
              }}
              openwidth={openwidth}
              onClick={() => handleClick(E)}
            >
              {openwidth && (
                <Typography
                  color={E.status ? theme.palette.primary.main : "#ffffff"}
                >
                  {t(E.id)}
                </Typography>
              )}

              <Box
                style={{
                  width: "1.3rem",
                  height: "1.3rem",
                  cursor: "pointer",
                }}
                onClick={() => handleClick(E)}
              >
                <E.Logo
                  stroke={E.status ? theme.palette.primary.main : "#ffffff"}
                />
              </Box>
            </ItemMenu>
          ) : (
            E.id !== "IconMenuBar" && (
              <ItemMenu
                item
                sx={{
                  background: `${
                    E.status ? "#E5FFF6" : theme.palette.primary.main
                  }`,
                }}
                openwidth={openwidth}
              >
                {openwidth && (
                  <Typography
                    color={E.status ? theme.palette.primary.main : "#ffffff"}
                  >
                    {t(E.id)}
                  </Typography>
                )}

                <Box
                  style={{ width: "1.3rem", height: "1.3rem" }}
                  onClick={() => handleClick(E)}
                >
                  <E.Logo
                    stroke={E.status ? theme.palette.primary.main : "#ffffff"}
                  />
                </Box>
              </ItemMenu>
            )
          );
        }
      })}
    </>
  );
};

export const NavbarSide = ({
  navbarList,
  handleClick,
  statusDashboard,
  entitiesDashboard,
  isDesktop,
  openwidth,
  t,
}) => {
  const theme = useTheme();
  return (
    <>
      {navbarList.map((E, i) => {
        return openwidth && E.id === "logo" ? (
          <li
            style={{
              background: `${
                E.status ? "#E5FFF6" : theme.palette.primary.main
              }`,
              display: "flex",
              width: "144px",
              height: "142px",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "8px",
            }}
            data-name="logo"
          >
            <Box style={{ width: "1.3rem", height: "1.3rem" }}>
              <E.Logo
                stroke={E.status ? theme.palette.primary.main : "#ffffff"}
                style={{
                  transform: "scale(3.5)",
                  position: "relative",
                  top: "47px",
                  transition: "transform 2s linear 1s",
                }}
              />
            </Box>
            <Box
              sx={{
                width: "144px",
                height: "42px",
                background: "rgb(229, 255, 246)",
                position: "relative",
                top: "102px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography color={theme.palette.primary.main}>
                {statusDashboard === "succeeded" &&
                  entitiesDashboard?.data?.user?.name}
              </Typography>
            </Box>
          </li>
        ) : E.id !== "admin" &&
          entitiesDashboard?.data?.user?.permissions.some((j) => {
            if (
              E?.id === "home" ||
              E?.id === "logo" ||
              E?.id === "profile" ||
              E?.id === "IconMenuBar"
            ) {
              return true;
            } else {
              return j.name === E?.name;
            }
          }) &&
          isDesktop === true ? (
          <ItemMenu
            item
            xs={1}
            sx={{
              background: `${
                E.status ? "#E5FFF6" : theme.palette.primary.main
              }`,
              cursor: "pointer",
            }}
            openwidth={openwidth}
            onClick={() => handleClick(E)}
          >
            {openwidth && (
              <Typography
                color={E.status ? theme.palette.primary.main : "#ffffff"}
              >
                {t(E.id)}
              </Typography>
            )}

            <Box
              style={{
                width: "1.3rem",
                height: "1.3rem",
                cursor: "pointer",
              }}
              onClick={() => handleClick(E)}
            >
              <E.Logo
                stroke={E.status ? theme.palette.primary.main : "#ffffff"}
              />
            </Box>
          </ItemMenu>
        ) : (
          E.id !== "IconMenuBar" &&
          E.id !== "admin" &&
          entitiesDashboard?.data?.user?.permissions.some((j) => {
           
              return j.name === E?.name;
            
          }) && (
            <ItemMenu
              item
              sx={{
                background: `${
                  E.status ? "#E5FFF6" : theme.palette.primary.main
                }`,
              }}
              openwidth={openwidth}
            >
              {openwidth && (
                <Typography
                  color={E.status ? theme.palette.primary.main : "#ffffff"}
                >
                  {t(E.id)}
                </Typography>
              )}

              <Box
                style={{ width: "1.3rem", height: "1.3rem" }}
                onClick={() => handleClick(E)}
              >
                <E.Logo
                  stroke={E.status ? theme.palette.primary.main : "#ffffff"}
                />
              </Box>
            </ItemMenu>
          )
        );
      })}
    </>
  );
};

// (entitiesDashboard?.data?.user?.permissions[i]?.name ===
//     "user_show" ||
//     entitiesDashboard?.data?.user?.permissions[i]?.name ===
//       "interaction" ||
//     entitiesDashboard?.data?.user?.permissions[i]?.name ===
//       "instruction" ||
//     entitiesDashboard?.data?.user?.permissions[i]?.name === "note" ||
//     entitiesDashboard?.data?.user?.permissions[i]?.name ===
//       "client_show")
