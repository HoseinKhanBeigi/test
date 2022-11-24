import { useEffect, useRef, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { NavLink, Outlet, Navigate ,useLocation, useNavigate} from "react-router-dom";
import { usersList } from "../../actions/users";

export const ProtectedRoute = () => {
  const location = useLocation()
  const { entities,status } = useSelector((state) => state.userList);
  // const { userInfo } = useSelector((state) => state.users);
const navigate = useNavigate()


const dispatch = useDispatch();


  // useEffect(() => {
  //   if (!test) {
  //     navigation("/login")
  //   }
  // }, [test]);



  const token = localStorage.getItem("userToken")




  // show unauthorized screen if no user is found in redux store
  return (
    token
        ? <Outlet />
        : <Navigate to="/login" state={{ from: location }} replace />
)
};
