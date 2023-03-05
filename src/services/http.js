import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { messageHandling } from "../features/messageLog";

import axios from "axios";
const instance = axios.create({
  baseURL: "http://10.154.65.29:9000/api",
});

const AxiosInterceptor = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const resInterceptor = (response) => {
      return response;
    };
    const errInterceptor = (error) => {
      if (!error.response) {
        dispatch(messageHandling(error));
      }
      dispatch(messageHandling(error.response));
      if (error.response.status === 401) {
        navigate("/login");
        dispatch(messageHandling(error.response));
        localStorage.removeItem("userToken");
      } else if (error.response.status === 403) {
        dispatch(messageHandling(error.response));
      }

      return Promise.reject(error);
    };

    const interceptor = instance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => instance.interceptors.response.eject(interceptor);
  }, []);

  return children;
};

export default instance;
export { AxiosInterceptor };
