import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  createSearchParams,
} from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useTranslation } from "react-i18next";
import { format } from "date-fns-jalali";
import { AppBar, Toolbar, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import StarBorder from "@mui/icons-material/StarBorder";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Drawer } from "./drawer";

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
import { dashboardApp, logout } from "../../actions/profile";
import { removeState } from "../../features/detailUser";
import {
  changeMenuBar,
  openMenuBar,
  filterMenuItem,
  showMenuItem,
} from "../../features/navbar";
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
  ProfileLogo,
  EnterIcone,
  ExitIcon,
  ChangePasswordIcon,
} from "../icons";
import moment from "moment";
import { styled } from "@mui/material/styles";
import { useDispatchAction } from "../../hooks/useDispatchAction";
import useResponsive from "../../hooks/useResponsive";
import { MenuListOwn } from "../menuList";
import { NavbarSide, NavbarSideSuperAdmin } from "./navbar";
import { handleLoading } from "../../features/loading";

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
  const [anchorElProfile, setAnchorElProfile] = React.useState(null);
  const openProfle = Boolean(anchorElProfile);
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
      dispatch(filterMenuItem({ isDesktop }));
    } else {
      dispatch(filterMenuItem({ isDesktop }));
      setOpenwidth(false);
    }
  }, [isDesktop]);

  const handleClick = (e, key, name) => {
    dispatch(changeMenuBar({ status: e.id, key, name }));
    if (e.id === "IconMenuBar") {
      navigate(path.pathname.slice(1, path.pathname.length));
    } else {
      if (e?.keySearch) {
        navigate(
          `${e.path}?${[e?.keySearch]}=${entitiesDashboard?.data?.user?.level}`
        );
        dispatch(
          e?.action({
            params: { [e?.keySearch]: entitiesDashboard?.data?.user?.level },
          })
        );
      } else {
        navigate(e.path);
      }
    }

    if (e.id === "IconMenuBar") {
      handleOpenMenuBar();
    }
  };

  useEffect(() => {
    const str = path.pathname.slice(1, path.pathname.length);
    const res = str.split("/");
    dispatch(
      changeMenuBar({
        status: res[0],
        key: "two",
      })
    );
  }, [path.pathname]);
  const handleDrawerOpen = () => {
    setIsResponsive(!isResponsive);
    dispatch(openMenuBar());
  };

  const handleProfile = (event) => {
    setAnchorElProfile(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setAnchorElProfile(null);
  };
  const theme = useTheme();

  const handleToProfile = () => {
    navigate("/profile");
  };

  const handleToChangePassword = () => {
    navigate("/change-password");
  };
  const handleLogOut = () => {
    dispatch(logout({})).then(() => {
      localStorage.removeItem("userToken");
      navigate(0);
    });
  };

  return (
    <Box>
      <NavBar
        isResponsive={isResponsive}
        isDesktop={isDesktop}
        style={{
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
        {statusDashboard === "succeeded" && (
          <Drawer
            t={t}
            navbarList={navbarList}
            handleClick={handleClick}
            openwidth={openwidth}
            entitiesDashboard={entitiesDashboard}
          />
        )}
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
            <Grid item md={6} lg={6} sm={6} xs={12}>
              <Grid
                onClick={handleProfile}
                container
                alignItems={"center"}
                sx={{
                  width: "fit-content",
                  border: "1px solid #777777",
                  padding: "0.3rem",
                  borderRadius: "12px",
                }}
                justifyContent="center"
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

            <Grid item md={6} lg={6} sm={6} xs={12}>
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
      <MenuListOwn
        anchorEl={anchorElProfile}
        open={openProfle}
        handleClose={handleCloseProfile}
      >
        <Box sx={{ width: "130px", cursor: "pointer" }}>
          <Grid
            container
            justifyContent={"space-between"}
            mb={2}
            onClick={handleToProfile}
          >
            <Typography>{t("profile")}</Typography>
            <ProfileLogo stroke={"#000000"} />
          </Grid>
        </Box>
        <Box sx={{ width: "130px" }}>
          <Grid
            container
            justifyContent={"space-between"}
            onClick={handleToChangePassword}
            mb={2}
          >
            <Typography>{t("changePassword")}</Typography>
            <ChangePasswordIcon stroke={"#000000"} />
          </Grid>
        </Box>
        <Box sx={{ width: "130px", cursor: "pointer" }}>
          <Grid
            container
            justifyContent={"space-between"}
            onClick={handleLogOut}
          >
            <Typography>{t("exit")}</Typography>
            <ExitIcon stroke={"#000000"} />
          </Grid>
        </Box>
      </MenuListOwn>
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
          {(entitiesDashboard?.data?.user?.super_admin === 1 ||
            entitiesDashboard?.data?.user.permissions.some(
              (e) => e.name === "meeting_create"
            )) && (
            <MenuItem
              sx={{ justifyContent: "end" }}
              onClick={handleInsertMeeting}
            >
              <Typography color={"#017874"}> {t("insert meeting")}</Typography>
            </MenuItem>
          )}

          {(entitiesDashboard?.data?.user?.super_admin === 1 ||
            entitiesDashboard?.data?.user.permissions.some(
              (e) => e.name === "call_create"
            )) && (
            <MenuItem sx={{ justifyContent: "end" }} onClick={handleInsertCall}>
              <Typography color={"#017874"}>{t("insert call")}</Typography>
            </MenuItem>
          )}

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
              {(entitiesDashboard?.data?.user?.super_admin === 1 ||
                entitiesDashboard?.data?.user.permissions.some(
                  (e) => e.name === "user_create"
                )) && (
                <MenuItem
                  sx={{ justifyContent: "end" }}
                  onClick={handleInsertUserSingle}
                >
                  <Typography color={"#017874"}> {t("single")}</Typography>
                </MenuItem>
              )}
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
              {(entitiesDashboard?.data?.user?.super_admin === 1 ||
                entitiesDashboard?.data?.user.permissions.some(
                  (e) => e.name === "client_create"
                )) && (
                <MenuItem
                  sx={{ justifyContent: "end" }}
                  onClick={handleInsertClientSingle}
                >
                  <Typography color={"#017874"}> {t("single")}</Typography>
                </MenuItem>
              )}
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
