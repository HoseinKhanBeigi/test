import { DropDown } from "../dropdown";
import React, { useEffect, useState } from "react";
import { useReducer } from "react";
import {dropDownAction} from "../../features/filter"

export const FilterDropDown = ({
  handleChange,
  initialReducer,
  actiontype,
  property,
  status,
  onFilter,
  onFilterDropDown,
  defaultQuery,
  filtersList,
  items
}) => {
  
  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case `${actiontype}`:
  //       return state.map((item) => {
  //         if (item[property] === action[property]) {
  //           return { ...item, [status]: !item[status] };
  //         } else {
  //           return item;
  //         }
  //       });
  //     default:
  //       return state;
  //   }
  // };

  // const handleChange = (item) => {
  //   dispatch({ type: `${actiontype}`, [property]: item[property] });
  // };
  // const [items, dispatch] = useReducer(reducer, initialReducer);
  return (
    <>
      {items.map((e, i) => (
        <DropDown
        filtersList={filtersList}
          onFilter={onFilter}
          defaultQuery={defaultQuery}
          onFilterDropDown={onFilterDropDown}
          key={i}
          data={e}
          open={e[status]}
          handleClick={() => handleChange(e)}
          actiontype={e.inputType}
          property="name"
          status="checked"
        />
      ))}
    </>
  );
};
