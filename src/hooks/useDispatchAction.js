import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getQueryParams } from "../utils";

export const useDispatchAction = (action, status, option) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      if (!option) {
        dispatch(action({ params: { page: 1, ...getQueryParams() } }));
      } else {
        dispatch(action({}));
      }
    }
  }, [dispatch, status]);
};
