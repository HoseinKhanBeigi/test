import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import React, { useEffect } from "react";
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
  const navigationMenu = [
    { name: "home", logo: <Dlogo stroke={"#ffffff"} /> },
    { name: "home", logo: <Hlogo stroke={"#ffffff"} /> },
    { name: "reports", logo: <ReLogo stroke={"#ffffff"} /> },
    { name: "users", logo: <Users stroke={"#ffffff"} /> },
    { name: "clients", logo: <Clients stroke={"#ffffff"} /> },
    { name: "interactions", logo: <InteractionsLogo stroke={"#ffffff"} /> },

    { name: "instructions", logo: <InstructionsLogo stroke={"#ffffff"} /> },
    { name: "notes", logo: <NotesLogo stroke={"#ffffff"} /> },
    { name: "admin", logo: <AdminLogo stroke={"#ffffff"} /> },
    { name: "checkouts", logo: <Checkouts stroke={"#ffffff"} /> },
    { name: "profile", logo: <ProfileLogo stroke={"#ffffff"} /> },
  ];

  const  handleClick = ()=>{

  }

  useEffect(() => {
    if (path.pathname === "/") {
      history(`/home`);
    }
  }, [path.pathname]);

  return (
    <>
      <div className="parent">
        <div className="sideBar">
          <nav>
            <ul className="sideBar_list">
              {navigationMenu.map((el, i) => {
                return (
                  <li className="sideBar_item" key={i}>
                    <Link to={el.name} onClick={(e) => handleClick(e)}>{el.logo}</Link>
                  </li>
                );
              })}
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
