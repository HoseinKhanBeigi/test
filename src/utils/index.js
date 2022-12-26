import { createSearchParams } from "react-router-dom";
import {  isArray } from "lodash";
export function appendSearchParams(obj, searchParams) {
  const sp = createSearchParams(searchParams);
  Object.entries(obj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      sp.delete(key);
      value.forEach((v) => sp.append(key, v));
    } else if (value === undefined) {
      sp.delete(key);
    } else {
      sp.set(key, value);
    }
  });
  return sp;
}

export function groupBy(objectArray, property) {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    const curGroup = acc[key] ?? [];
    return { ...acc, [key]: [...curGroup, obj] };
  }, {});
}

export const getQueryParams = (query = null) =>
  [
    ...new URLSearchParams(query || window.location.search || "").entries(),
  ].reduce((a, [k, v]) => ((a[k] = v), a), {});

export const debounce = (func) => {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, 500);
  };
};

export function removeParams(keys, navigate) {
  let params = new URLSearchParams(window.location.search);
  if (isArray(keys)) {
    keys.map((e) => params.delete(e));
  } else {
    params.delete(keys);
  }
  navigate({
    search: `?${createSearchParams(params)}`,
  });
}
