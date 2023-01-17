import { useReducer,useRef } from "react";

export const useCheckBox = (actionLoading, entities) => {
  const initialReducer = useRef([]);
  actionLoading === "succeeded" &&
    entities?.data?.data.map((e, i) => {
      initialReducer.current[i] = { checked: false, ...e };
    });
  const reducer = (state, action) => {
    switch (action.type) {
      case "SELECTALL":
        return state.map((item) => {
          return { ...item, checked: !item.checked };
        });

      case "SELECTITEM":
        return state.map((item) => {
          if (item.id === action.id) {
            return { ...item, checked: !item.checked };
          } else {
            return item;
          }
        });
      default:
        return state;
    }
  };

  const [items, dispatchAction] = useReducer(reducer, initialReducer.current);

  return {
    items: items,
    dispatchAction: dispatchAction,
  };
};
