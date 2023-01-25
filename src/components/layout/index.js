import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import Select from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import { format } from "date-fns-jalali";
import { AppBar, Toolbar, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import StarBorder from "@mui/icons-material/StarBorder";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { dashboardApp } from "../../actions/profile";
import { removeState } from "../../features/detailUser";
import { changeMenuBar } from "../../features/navbar";
import "./index.css";
import {
  UserIconTitle,
  CreateIcon,
  PhoneIcon,
  PhoneOption,
  CloseIcon,
  SupportAgentIcon,
  NotifyIcon,
  Phone,
  IconMenuBar,
} from "../icons";
import moment from "moment";
import { styled } from "@mui/material/styles";
import { useDispatchAction } from "../../hooks/useDispatchAction";
import useResponsive from "../../hooks/useResponsive";

const NavBar = styled("nav", {
  shouldForwardProp: (prop) => prop !== "openwidth",
})(({ theme, openwidth, isDesktop, isResponsive }) => ({
  ...(openwidth === false && {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: isDesktop ? `90px` : 0,
  }),
  ...(openwidth &&
    !isDesktop && {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      width: !isDesktop && isResponsive ? "211px" : 0,
    }),

  ...(openwidth &&
    isDesktop && {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      width: "211px",
    }),
}));

const Header = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "openwidth",
})(({ theme, openwidth, isResponsive }) => ({
  ...(openwidth &&
    !isResponsive && {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      width: `100%`,
    }),
  ...(!openwidth &&
    isResponsive && {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      width: `calc(100% - 211px)`,
    }),
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));
const ItemMenu = styled("li", {
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
export const Layout = () => {
  const path = useLocation();
  const params = useParams();
  const [isResponsive, setIsResponsive] = useState(false);
  const history = useNavigate();
  const root = useRef();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick1 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open2, setOpen] = React.useState(true);

  const [open3, setOpen3] = React.useState(true);

  const handleClick2 = () => {
    setOpen(!open2);
  };

  const handleClick3 = () => {
    setOpen3(!open3);
  };

  const handleTest = (e) => {};
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleInsertUserSingle = () => {
    navigate("users/create");
    setAnchorEl(null);
  };

  const handleInsertUserCouple = () => {
    navigate("users/createCouple");
    setAnchorEl(null);
  };

  const handleInsertClientSingle = () => {
    navigate("clients/create");
    setAnchorEl(null);
  };

  const [openwidth, setOpenwidth] = useState(false);

  const handleOpenMenuBar = () => {
    setOpenwidth(!openwidth);
  };

  const handleInsertClientCouple = () => {
    navigate("clients/createCouple");
    setAnchorEl(null);
  };

  const handleInsertCall = () => {
    navigate("interactions/calls/create");
    setAnchorEl(null);
  };

  const handleInsertMeeting = () => {
    navigate("interactions/meetings/create");
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const { statusDashboard, entitiesDashboard, error } = useSelector(
    (state) => state.dashboardAppSlice
  );

  const { navbarList } = useSelector((state) => state.navBarSlice);

  useDispatchAction(dashboardApp, statusDashboard, "option");

  const isDesktop = useResponsive("up", "md");

  useEffect(() => {
    if (isDesktop === false) {
      setOpenwidth(true);
    } else {
      setOpenwidth(false);
    }
  }, [isDesktop]);

  const handleClick = (e) => {
    dispatch(changeMenuBar({ status: e.id }));
    if (e.id === "IconMenuBar") {
      navigate(path.pathname.slice(1, path.pathname.length));
    } else {
      navigate(e.path);
    }

    if (e.id === "IconMenuBar") {
      handleOpenMenuBar();
    }
  };
  const handleDrawerOpen = () => {

    setIsResponsive(!isResponsive);
  };
  const theme = useTheme();
  return (
    <Box>
      <NavBar
        isResponsive={isResponsive}
        isDesktop={isDesktop}
        style={{
          display: "flex",
          // width: "211px",
          right: 0,
          height: "100vh",
          position: "fixed",
          // overflowY: "scroll",
          top: 0,
          backgroundColor: theme.palette.primary.main,
          zIndex: 999,
        }}
        openwidth={openwidth}
      >
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            flexDirection: "column",
            margin: 0,
            justifyContent: "space-between",
            alignItems: "center",
            alignContent: "center",
            padding: 0,
            width: openwidth ? "211px" : "90px",
            zIndex: 999,
          }}
          ref={root}
        >
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
                  <Box
                    // to={
                    //   E.id === "IconMenuBar"
                    //     ? path.pathname.slice(1, path.pathname.length)
                    //     : E.path
                    // }
                    style={{ width: "1.3rem", height: "1.3rem" }}
                    // onClick={() => handleClick(E)}
                  >
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
                  style={{
                    background: `${
                      E.status ? "#E5FFF6" : theme.palette.primary.main
                    }`,
                    cursor:"pointer"
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
                    // to={
                    //   E.id === "IconMenuBar"
                    //     ? path.pathname.slice(1, path.pathname.length)
                    //     : E.path
                    // }
                    style={{ width: "1.3rem", height: "1.3rem",cursor:"pointer" }}
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
                    style={{
                      background: `${
                        E.status ? "#E5FFF6" : theme.palette.primary.main
                      }`,
                    }}
                    openwidth={openwidth}
                  >
                    {openwidth && (
                      <Typography
                        color={
                          E.status ? theme.palette.primary.main : "#ffffff"
                        }
                      >
                        {t(E.id)}
                      </Typography>
                    )}

                    <Box
                      // to={
                      //   E.id === "IconMenuBar"
                      //     ? path.pathname.slice(1, path.pathname.length)
                      //     : E.path
                      // }
                      style={{ width: "1.3rem", height: "1.3rem" }}
                      onClick={() => handleClick(E)}
                    >
                      <E.Logo
                        stroke={
                          E.status ? theme.palette.primary.main : "#ffffff"
                        }
                      />
                    </Box>
                  </ItemMenu>
                )
              );
            }
          })}
        </ul>
      </NavBar>
      <Container maxWidth="lg">
        <Header position="fixed" openwidth={open} isResponsive={isResponsive}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              sx={{ flexGrow: 1 }}
              component="div"
            >
              {statusDashboard === "succeeded" && !isDesktop && (
                <Typography paddingLeft={"7px"}>
                  {`${entitiesDashboard?.data?.user?.name} -${entitiesDashboard?.data?.user?.position}- ${entitiesDashboard?.data?.user?.level} `}
                </Typography>
              )}
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              // sx={{ ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Header>
        <Box sx={{ position: "relative" }}>
          <Grid
            container
            dir="rtl"
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Grid item md={3} lg={3} sm={3} xs={12}>
              <Grid
                container
                alignItems={"center"}
                sx={{
                  width: "100%",
                  border: "1px solid #777777",
                  padding: "0.3rem",
                  borderRadius: "12px",
                }}
                justifyContent="space-between"
              >
                <UserIconTitle />

                {}
                {statusDashboard === "succeeded" && isDesktop && (
                  <Typography paddingLeft={"7px"}>
                    {`${entitiesDashboard?.data?.user?.name} -${entitiesDashboard?.data?.user?.position}- ${entitiesDashboard?.data?.user?.level} `}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid item md={4} lg={4} sm={4} xs={12}>
              <Grid
                container
                // sx={{ width: "224px" }}
                alignItems="center"
                justifyContent={"flex-end"}
              >
                {/* <IconButton
                    sx={{ p: "10px" }}
                    aria-label="menu"
                    onClick={handleOpenMenuBar}
                  >
                    <IconMenuBar stroke={"#000"} />
                  </IconButton> */}

                <IconButton
                  sx={{ p: "10px" }}
                  aria-label="menu"
                  onClick={handleClick1}
                >
                  <CreateIcon />
                </IconButton>
                <IconButton
                  sx={{ p: "0px" }}
                  aria-label="menu"
                  // onClick={handleCreate}
                >
                  <Phone />
                </IconButton>
                <IconButton
                  sx={{ p: "10px" }}
                  aria-label="menu"
                  // onClick={handleCreate}
                >
                  <SupportAgentIcon />
                </IconButton>
                <IconButton
                  sx={{ p: "10px" }}
                  aria-label="menu"
                  // onClick={handleCreate}
                >
                  <NotifyIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Outlet />
        </Box>
      </Container>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            padding: "12px",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              left: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Grid item>
          <Grid container justifyContent={"space-between"} alignItems="center">
            <IconButton
              sx={{ p: "10px" }}
              aria-label="menu"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
            <Typography> {t("insert information")}</Typography>
          </Grid>
          <Divider />

          <Typography dir="rtl" sx={{ padding: "12px", color: "silver" }}>
            {t("enter type of data")}
          </Typography>

          <MenuItem
            sx={{ justifyContent: "end" }}
            onClick={handleInsertMeeting}
          >
            <Typography color={"#017874"}> {t("insert meeting")}</Typography>
          </MenuItem>
          <MenuItem sx={{ justifyContent: "end" }} onClick={handleInsertCall}>
            <Typography color={"#017874"}>{t("insert call")}</Typography>
          </MenuItem>
          <ListItemButton
            onClick={handleClick2}
            dir="rtl"
            sx={{ justifyContent: "space-between" }}
          >
            <Typography> {t("insert user")}</Typography>
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open2} timeout="auto">
            <List component="div" disablePadding>
              <MenuItem
                sx={{ justifyContent: "end" }}
                onClick={handleInsertUserSingle}
              >
                <Typography color={"#017874"}> {t("single")}</Typography>
              </MenuItem>
              <MenuItem
                sx={{ justifyContent: "end" }}
                onClick={handleInsertUserCouple}
              >
                <Typography color={"#017874"}>{t("couple")}</Typography>
              </MenuItem>
            </List>
          </Collapse>

          <ListItemButton
            onClick={handleClick3}
            dir="rtl"
            sx={{ justifyContent: "space-between" }}
          >
            <Typography> {t("insert client")}</Typography>
            {open3 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open3} timeout="auto">
            <List component="div" disablePadding>
              <MenuItem
                sx={{ justifyContent: "end" }}
                onClick={handleInsertClientSingle}
              >
                <Typography color={"#017874"}> {t("single")}</Typography>
              </MenuItem>
              <MenuItem
                sx={{ justifyContent: "end" }}
                onClick={handleInsertClientCouple}
              >
                <Typography color={"#017874"}>{t("couple")}</Typography>
              </MenuItem>
            </List>
          </Collapse>
        </Grid>
      </Menu>
    </Box>
  );
};
