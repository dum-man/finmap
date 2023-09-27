import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DEFAULT_DATE_OPTION } from "app/constants";
import { Account, DatePickerDate, SelectOption } from "types";

interface FilterState {
  selectedAccountIds: string[];
  selectedOption: SelectOption;
  searchQuery: string;
  selectedDates: DatePickerDate;
}

const initialState: FilterState = {
  selectedAccountIds: [],
  selectedOption: DEFAULT_DATE_OPTION,
  searchQuery: "",
  selectedDates: null,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addSelectedAccount: (state, { payload: account }: PayloadAction<Account>) => {
      state.selectedAccountIds.push(account.id);
    },
    removeSelectedAccount: (state, { payload: account }: PayloadAction<Account>) => {
      state.selectedAccountIds = state.selectedAccountIds.filter(
        (id) => id !== account.id
      );
    },
    setSelectedOption: (state, { payload: option }: PayloadAction<SelectOption>) => {
      state.selectedOption = option;
    },
    setSearchQuery: (state, { payload: query }: PayloadAction<string>) => {
      state.searchQuery = query;
    },
    setSelectedDates: (state, { payload: dates }: PayloadAction<DatePickerDate>) => {
      state.selectedDates = dates;
    },
  },
});

export const {
  addSelectedAccount,
  removeSelectedAccount,
  setSelectedOption,
  setSearchQuery,
  setSelectedDates,
} = filterSlice.actions;

export default filterSlice.reducer;
