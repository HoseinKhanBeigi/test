import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import React, { useEffect, useRef } from "react";
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
  const root = useRef();
  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    [...root.current.querySelectorAll(".sideBar_item")].forEach((e) => {
      e.classList.remove("sideBar_current");
    });
    event.currentTarget.classList.add("sideBar_current");
    [...root.current.querySelectorAll(".sideBar_item")][0].classList.remove(
      "sideBar_current"
    );
  };

  useEffect(() => {
    if (path.pathname === "/") {
      history(`/home`);
    }

    [...root.current.querySelectorAll(".sideBar_item")].forEach((e) => {
     console.log(e);
    });
  }, [path.pathname]);

  return (
    <>
      <div className="parent">
        <div className="sideBar">
          <nav>
            <ul className="sideBar_list" ref={root}>
              <li className="sideBar_item" onClick={handleClick}>
                <Link to="home">
                  <Dlogo stroke={"#ffffff"} />
                </Link>
              </li>
              <li className="sideBar_item" onClick={handleClick}>
                <Link to="home">
                  <Hlogo stroke={"#ffffff"} />{" "}
                </Link>
              </li>
              <li className="sideBar_item" onClick={handleClick}>
                <Link to="reports">
                  <ReLogo stroke={"#ffffff"} />{" "}
                </Link>
              </li>
              <li className="sideBar_item" onClick={handleClick}>
                <Link to="users">
                  <Users stroke={"#ffffff"} />{" "}
                </Link>
              </li>
              <li className="sideBar_item" onClick={handleClick}>
                <Link to="clients">
                  <Clients stroke={"#ffffff"} />
                </Link>
              </li>
              <li className="sideBar_item" onClick={handleClick}>
                <Link to="interactions">
                  <InteractionsLogo stroke={"#ffffff"} />
                </Link>
              </li>
              <li className="sideBar_item" onClick={handleClick}>
                <Link to="instructions">
                  <InstructionsLogo stroke={"#ffffff"} />
                </Link>
              </li>
              <li className="sideBar_item" onClick={handleClick}>
                <Link to="notes">
                  <NotesLogo stroke={"#ffffff"} />
                </Link>
              </li>
              <li className="sideBar_item" onClick={handleClick}>
                <Link to="admin">
                  <AdminLogo stroke={"#ffffff"} />
                </Link>
              </li>
              <li className="sideBar_item" onClick={handleClick}>
                <Link to="checkouts">
                  <Checkouts stroke={"#ffffff"} />
                </Link>
              </li>
              <li className="sideBar_item" onClick={handleClick}>
                <Link to="profile">
                  <ProfileLogo stroke={"#ffffff"} />
                </Link>
              </li>
            </ul>
          </nav>
          <div className="page">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
