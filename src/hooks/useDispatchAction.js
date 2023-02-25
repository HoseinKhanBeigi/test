import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getQueryParams } from "../utils";

export const useDispatchAction = (action, status, limit = 10) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(action({ params: { page: 1, ...getQueryParams(), limit } }));
    }
  }, [dispatch, status]);
};
