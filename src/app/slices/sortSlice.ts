import { createSlice } from "@reduxjs/toolkit";

type SortType = "UP" | "DOWN" | "DEFAULT";

interface SortState {
  transcationType: SortType;
  dateType: SortType;
  amountType: SortType;
}

const initialState: SortState = {
  transcationType: "DEFAULT",
  dateType: "DEFAULT",
  amountType: "DEFAULT",
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    toggleTranscationType: (state) => {
      state.dateType = "DEFAULT";
      state.amountType = "DEFAULT";
      switch (state.transcationType) {
        case "UP":
          state.transcationType = "DOWN";
          break;
        case "DOWN":
          state.transcationType = "UP";
          break;
        default:
          state.transcationType = "UP";
      }
    },
    toggleDateType: (state) => {
      state.transcationType = "DEFAULT";
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
      state.transcationType = "DEFAULT";
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

export const { toggleTranscationType, toggleDateType, toggleAmountType } =
  sortSlice.actions;

export default sortSlice.reducer;
