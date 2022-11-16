import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid"

import React, { useEffect, useRef, useState } from "react";
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

  return (
   <Grid container flexDirection={"row-reverse"} sx={{width:"1900px"}} justifyContent="center">
     <div className="sideBar">
          <nav>
            <ul className="sideBar_list" ref={root}>
              <li
                className="sideBar_item"
                onClick={handleClick}
                data-name="logo"
              >
                <Link to="home">
                  <Dlogo stroke={currentSelect.color} />
                </Link>
              </li>
              <li
                className="sideBar_item"
                onClick={handleClick}
                data-name="home"
              >
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
              <li
                className="sideBar_item"
                onClick={handleClick}
                data-name="users"
              >
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
              <li
                className="sideBar_item"
                onClick={handleClick}
                data-name="notes"
              >
                <Link to="notes">
                  <NotesLogo stroke={currentSelect[7].color} />
                </Link>
              </li>
              <li
                className="sideBar_item"
                onClick={handleClick}
                data-name="admin"
              >
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
        </div>

        <Container maxWidth="xl">
          <Box paddingTop={12}>
            <Outlet />
          </Box>
        </Container>
   </Grid>
       
     
  );
};
