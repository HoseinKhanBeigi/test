import Pagination from "@mui/material/Pagination";
import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import {
  appendSearchParams,
  groupBy,
  getQueryParams,
  removeParams,
} from "../../utils";
import { PersianPagination } from "../paginationCompoent";

export const PaginationTable = ({ status, entities, action, limit = 10 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {t} = useTranslation()
  const defaultQuery = { ...getQueryParams() };
  const [page, setPage] = React.useState(defaultQuery?.page || 1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    const params = { ...getQueryParams(), page: newPage };
    navigate({
      search: `?${createSearchParams(params)}`,
    });
    dispatch(action({ params: { page: newPage, ...getQueryParams(), limit } }));
  };

  return (
    <>
    {/* <PersianPagination /> */}
      {status === "succeeded" && entities?.data?.data && (
        <Pagination
          dir="ltr"
          count={Math.ceil(entities?.data?.total / limit)}
          labelDisplayedRows={(val)=>{
              console.log(val)
          }}
          page={
            defaultQuery?.page === undefined || defaultQuery?.user ||  defaultQuery?.level
              ? entities?.data?.current_page
              : Number(page)
          }
          onChange={handleChangePage}
          color="primary"
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
