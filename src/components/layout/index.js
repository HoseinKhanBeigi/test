import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import Select from "@mui/material/Select";
import { useTranslation } from "react-i18next";

import { Typography } from "@mui/material";
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
import React, { useEffect, useRef, useState } from "react";
import { dashboardApp } from "../../actions/profile";
import {removeState} from "../../features/detailUser"
import "./index.css";
import {
  Dlogo,
  Hlogo,
  ReLogo,
  Users,
  Clients,
  InteractionsLogo,
  InstructionsLogo,
  NotesLogo,
  AdminLogo,
  Checkouts,
  ProfileLogo,
  UserIconTitle,
  CreateIcon,
  PhoneIcon,
  PhoneOption,
  CloseIcon,
  SupportAgentIcon,
  NotifyIcon,
  Phone,
} from "../icons";
export const Layout = () => {
  const path = useLocation();
  const params = useParams();
  const history = useNavigate();
  const [currentSelect, setCurrentSelect] = useState([
    { id: "logo", color: "#ffffff" },
    { id: "home", color: "#ffffff" },
    { id: "reports", color: "#ffffff" },
    { id: "users", color: "#ffffff" },
    { id: "clients", color: "#ffffff" },
    { id: "interactions", color: "#ffffff" },
    { id: "instructions", color: "#ffffff" },
    { id: "notes", color: "#ffffff" },
    { id: "admin", color: "#ffffff" },
    { id: "profile", color: "#ffffff" },
  ]);
  const root = useRef();
  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    [...root.current.querySelectorAll(".sideBar_item")].forEach((e) => {
      e.classList.remove("sideBar_current");
    });

    const newState = currentSelect.map((e) => {
      if (e.id === event.currentTarget.getAttribute("data-name")) {
        return {
          ...e,
          color: (e.color = "#017874"),
        };
      } else {
        return {
          ...e,
          color: (e.color = "#ffffff"),
        };
      }
    });

    setCurrentSelect(newState);

    event.currentTarget.classList.add("sideBar_current");
    [...root.current.querySelectorAll(".sideBar_item")][0].classList.remove(
      "sideBar_current"
    );
  };

  useEffect(() => {
    if (path.pathname === "/") {
      history(`/home`);
    }

    const newState = currentSelect.map((e) => {
      if (e.id === path.pathname.slice(1)) {
        return {
          ...e,
          color: (e.color = "#017874"),
        };
      } else {
        return {
          ...e,
          color: (e.color = "#ffffff"),
        };
      }
    });

    setCurrentSelect(newState);
    [...root.current.querySelectorAll(".sideBar_item")].forEach((e) => {
      if (e.getAttribute("data-name") === path.pathname.slice(1)) {
        e.classList.add("sideBar_current");
      }
    });
  }, [path.pathname]);

  const handleCreate = () => {};

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
    // dispatch(removeState())
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

  React.useEffect(() => {
  
      dispatch(dashboardApp({}));
    
  }, []);


  // dashboardAppSlice
  return (
    <Box
      sx={{
        width: "1900px",
        display: "flex",
        flexWrap: "nowrap",
        flexDirection: "row-reverse",
      }}

      // justifyContent="center"
    >
      <nav className="nav1">
        <ul className="sideBar_list" ref={root}>
          <li className="sideBar_item" onClick={handleClick} data-name="logo">
            <Link to="home">
              <Dlogo stroke={currentSelect.color} />
            </Link>
          </li>
          <li className="sideBar_item" onClick={handleClick} data-name="home">
            <Link to="home">
              <Hlogo stroke={currentSelect[1].color} />{" "}
            </Link>
          </li>
          <li
            className="sideBar_item"
            onClick={handleClick}
            data-name="reports"
          >
            <Link to="reports">
              <ReLogo stroke={currentSelect[2].color} />{" "}
            </Link>
          </li>
          <li className="sideBar_item" onClick={handleClick} data-name="users">
            <Link to="users">
              <Users stroke={currentSelect[3].color} />{" "}
            </Link>
          </li>
          <li
            className="sideBar_item"
            onClick={handleClick}
            data-name="clients"
          >
            <Link to="clients">
              <Clients stroke={currentSelect[4].color} />
            </Link>
          </li>
          <li
            className="sideBar_item"
            onClick={handleClick}
            data-name="interactions"
          >
            <Link to="interactions">
              <InteractionsLogo stroke={currentSelect[5].color} />
            </Link>
          </li>
          <li
            className="sideBar_item"
            onClick={handleClick}
            data-name="instructions"
          >
            <Link to="instructions">
              <InstructionsLogo stroke={currentSelect[6].color} />
            </Link>
          </li>
          <li className="sideBar_item" onClick={handleClick} data-name="notes">
            <Link to="notes">
              <NotesLogo stroke={currentSelect[7].color} />
            </Link>
          </li>
          <li className="sideBar_item" onClick={handleClick} data-name="admin">
            <Link to="admin">
              <AdminLogo stroke={currentSelect[8].color} />
            </Link>
          </li>
          <li
            className="sideBar_item"
            onClick={handleClick}
            data-name="checkouts"
          >
            <Link to="checkouts">
              <Checkouts stroke={currentSelect[9].color} />
            </Link>
          </li>
          <li
            className="sideBar_item"
            onClick={handleClick}
            data-name="profile"
          >
            <Link to="profile">
              <ProfileLogo stroke={currentSelect.color} />
            </Link>
          </li>
        </ul>
      </nav>

      <Container maxWidth="lg">
        <Grid
          container
          dir="rtl"
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Grid item>
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
              {statusDashboard === "succeeded" && (
                <Typography
                  paddingLeft={"7px"}
                >{`${entitiesDashboard?.data?.user?.name} -${entitiesDashboard?.data?.user?.position}- ${entitiesDashboard?.data?.user?.level} `}</Typography>
              )}
            </Grid>
          </Grid>

          <Grid item>
            <Grid
              container
              sx={{ width: "184px" }}
              alignItems="center"
              justifyContent={"space-between"}
            >
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
