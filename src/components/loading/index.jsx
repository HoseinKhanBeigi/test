import { useEffect, useRef, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { NavLink, Outlet, Navigate ,useLocation, useNavigate} from "react-router-dom";
import { usersList } from "../../actions/users";

export const Loading = ({children}) => {

  return (
    <>{children}</>
    
)
};
