import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  NavLink,
  Outlet,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { clientsList } from "../../actions/clients";

export const ProtectedRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("userToken");
  useEffect(() => {
    if (!token) {
      navigate(0);
    }
  }, [token]);
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
