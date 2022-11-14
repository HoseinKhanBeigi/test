import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import "./index.css";
import { Dlogo, Hlogo,ReLogo } from "../icons";
export const Layout = () => {
  const navigationMenu = [
    { name: "home", logo: <Dlogo stroke={"#ffffff"} /> },
    { name: "Report", logo: <Hlogo stroke={"#ffffff"} /> },
    { name: "Marketers", logo: <ReLogo stroke={"#ffffff"} /> },
    { name: "Customers", url: "/icons/home.svg" },
    { name: "Interactions", url: "/icons/home.svg" },
    { name: "Instructions", url: "/icons/home.svg" },
    { name: "Notes", url: "/icons/home.svg" },
    { name: "control panel", url: "/icons/home.svg" },
    { name: "Queries", url: "/icons/home.svg" },
    { name: "profile", url: "/icons/home.svg" },
  ];
  return (
    <>
      <div className="parent">
        <div className="sideBar">
          <nav>
            <ul className="sideBar_list">
              {navigationMenu.map((el, i) => {
                return (
                  <li className="sideBar_item" key={i}>
                    {el.logo}
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
