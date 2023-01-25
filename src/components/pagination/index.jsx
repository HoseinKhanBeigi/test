import Pagination from "@mui/material/Pagination";
import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  appendSearchParams,
  groupBy,
  getQueryParams,
  removeParams,
} from "../../utils";

export const PaginationTable = ({ status, entities, action }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const defaultQuery = { ...getQueryParams() };
  const [page, setPage] = React.useState(defaultQuery?.page);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    const params = { ...getQueryParams(), page: newPage };
    navigate({
      search: `?${createSearchParams(params)}`,
    });
    dispatch(action({ params: { page: newPage, ...getQueryParams() } }));
  };
  return (
    <>
      {status === "succeeded" && entities?.data?.total !== 0 && (
        <Pagination
          dir="ltr"
          count={Math.ceil(
            status === "succeeded" && entities?.data?.total / 10
          )}
          page={page}
          onChange={handleChangePage}
          color="secondary"
          sx={{
            "& > *": {
              paddingTop: "72px !important",
              paddingBottom: "12px !important",
              justifyContent: "center",
            },
          }}
        />
      )}
    </>
  );
};
