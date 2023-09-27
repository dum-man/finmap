import { createSlice } from "@reduxjs/toolkit";

type SortType = "UP" | "DOWN" | "DEFAULT";

interface SortState {
  transactionType: SortType;
  dateType: SortType;
  amountType: SortType;
}

const initialState: SortState = {
  transactionType: "DEFAULT",
  dateType: "DEFAULT",
  amountType: "DEFAULT",
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    toggleTransactionType: (state) => {
      state.dateType = "DEFAULT";
      state.amountType = "DEFAULT";
      switch (state.transactionType) {
        case "UP":
          state.transactionType = "DOWN";
          break;
        case "DOWN":
          state.transactionType = "UP";
          break;
        default:
          state.transactionType = "UP";
      }
    },
    toggleDateType: (state) => {
      state.transactionType = "DEFAULT";
      state.amountType = "DEFAULT";
      switch (state.dateType) {
        case "UP":
          state.dateType = "DOWN";
          break;
        case "DOWN":
          state.dateType = "UP";
          break;
        default:
          state.dateType = "UP";
      }
    },
    toggleAmountType: (state) => {
      state.transactionType = "DEFAULT";
      state.dateType = "DEFAULT";
      switch (state.amountType) {
        case "UP":
          state.amountType = "DOWN";
          break;
        case "DOWN":
          state.amountType = "UP";
          break;
        default:
          state.amountType = "UP";
      }
    },
  },
});

export const { toggleTransactionType, toggleDateType, toggleAmountType } =
  sortSlice.actions;

export default sortSlice.reducer;
