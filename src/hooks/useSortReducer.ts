import { useReducer } from "react";
import { SortState } from "../types";

enum SortActionType {
  UP = "UP",
  DOWN = "DOWN",
}

interface SortAction {
  type: SortActionType;
  payload: {
    type: string;
    value: string;
  };
}

const useSortReducer = () => {
  const initialSortState = {
    transcationType: "",
    dateType: "",
    amountType: "",
  };

  function sortReducer(state: SortState, action: SortAction) {
    const { type, payload } = action;
    switch (type) {
      case SortActionType.UP:
        return {
          ...state,
          [payload.type]: payload.value,
        };
      case SortActionType.DOWN:
        return {
          ...state,
          [payload.type]: payload.value,
        };
      default:
        return state;
    }
  }

  const [sortState, dispatch] = useReducer(sortReducer, initialSortState);

  const sortDispatch = (type: string) => {
    dispatch({
      type:
        sortState[type as keyof typeof sortState] === "up"
          ? SortActionType.DOWN
          : SortActionType.UP,
      payload: {
        type,
        value: sortState[type as keyof typeof sortState] === "up" ? "down" : "up",
      },
    });
  };

  return { sortState, sortDispatch };
};

export default useSortReducer;
