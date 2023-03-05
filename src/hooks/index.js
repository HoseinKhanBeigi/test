import { useCallback, useMemo } from "react";
import { useReducer, useRef } from "react";

import { createSearchParams, useNavigate } from "react-router-dom";
export const useGetQueryParams = ({ ...values }) => {
  const getQueryParams = (query = null) =>
    [
      ...new URLSearchParams(query || window.location.search || "").entries(),
    ].reduce((a, [k, v]) => ((a[k] = v), a), {});

  const navigate = useNavigate();
  const params = { ...values, ...getQueryParams() };

  navigate({
    search: `?${createSearchParams(params)}`,
  });
};

export const useGetStatus = (actionLoading) => {
  () => {
    return {
      actionLoading: actionLoading,
    };
  };
};
