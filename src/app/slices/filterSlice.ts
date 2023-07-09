import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DEFAULT_DATE_OPTION } from "app/constants";
import { Account, DatepickerDate, SelectOption } from "types";

interface FilterState {
  selectedAccounts: Account[];
  selectedOption: SelectOption;
  searchQuery: string;
  selectedDates: DatepickerDate;
}

const initialState: FilterState = {
  selectedAccounts: [],
  selectedOption: DEFAULT_DATE_OPTION,
  searchQuery: "",
  selectedDates: null,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addSelectedAccount: (state, { payload: account }: PayloadAction<Account>) => {
      state.selectedAccounts.push(account);
    },
    removeSelectedAccount: (state, { payload: account }: PayloadAction<Account>) => {
      state.selectedAccounts = state.selectedAccounts.filter(
        (acc) => acc.id !== account.id
      );
    },
    setSelectedOption: (state, { payload: option }: PayloadAction<SelectOption>) => {
      state.selectedOption = option;
    },
    setSearchQuery: (state, { payload: query }: PayloadAction<string>) => {
      state.searchQuery = query;
    },
    setSelectedDates: (state, { payload: dates }: PayloadAction<DatepickerDate>) => {
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
