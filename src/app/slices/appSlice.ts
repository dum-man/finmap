import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CategoryType } from "types";

export interface AppState {
  resetPasswordOpen: boolean;
  sidebarOpen: boolean;
  createAccountOpen: boolean;
  deleteAccountOpen: boolean;
  userAccountMenuOpen: boolean;
  setUsernameOpen: boolean;
  createIncomeOpen: boolean;
  createExpenseOpen: boolean;
  createTransferOpen: boolean;
  transfersMeunOpen: boolean;
  settingsMenuOpen: boolean;
  accountsOpen: boolean;
  transactionCategoriesOpen: boolean;
  categoryType: CategoryType;
  changePasswordOpen: boolean;
  setLanguageOpen: boolean;
}

const initialState: AppState = {
  resetPasswordOpen: false,
  sidebarOpen: window.matchMedia("(min-width: 768px)").matches,
  createAccountOpen: false,
  deleteAccountOpen: false,
  userAccountMenuOpen: false,
  setUsernameOpen: false,
  createIncomeOpen: false,
  createExpenseOpen: false,
  createTransferOpen: false,
  transfersMeunOpen: false,
  settingsMenuOpen: false,
  accountsOpen: false,
  transactionCategoriesOpen: false,
  categoryType: null,
  changePasswordOpen: false,
  setLanguageOpen: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleResetPasswordOpen: (state) => {
      state.resetPasswordOpen = !state.resetPasswordOpen;
    },
    toggleSidebarOpen: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    toggleCreateAccountOpen: (state) => {
      state.createAccountOpen = !state.createAccountOpen;
    },
    toggleDeleteAccountOpen: (state) => {
      state.deleteAccountOpen = !state.deleteAccountOpen;
    },
    toggleUserAccountMenuOpen: (state, { payload: open }: PayloadAction<boolean>) => {
      state.userAccountMenuOpen = open;
    },
    toggleSetUsernameOpen: (state) => {
      state.setUsernameOpen = !state.setUsernameOpen;
    },
    toggleCreateIncomeOpen: (state) => {
      state.createIncomeOpen = !state.createIncomeOpen;
    },
    toggleCreateExpenseOpen: (state) => {
      state.createExpenseOpen = !state.createExpenseOpen;
    },
    toggleCreateTransferOpen: (state) => {
      state.createTransferOpen = !state.createTransferOpen;
    },
    toggleTransfersMeunOpen: (state, { payload: open }: PayloadAction<boolean>) => {
      state.transfersMeunOpen = open;
    },
    toggleSettingsMenuOpen: (state, { payload: open }: PayloadAction<boolean>) => {
      state.settingsMenuOpen = open;
    },
    toggleAccountsOpen: (state) => {
      state.accountsOpen = !state.accountsOpen;
    },
    toggleChangePasswordOpen: (state) => {
      state.changePasswordOpen = !state.changePasswordOpen;
    },
    toggleTransactionCategoriesOpen: (state) => {
      state.transactionCategoriesOpen = !state.transactionCategoriesOpen;
    },
    setCategoryType: (state, { payload: categoryType }: PayloadAction<CategoryType>) => {
      state.categoryType = categoryType;
    },
    toggleSetLanguageOpen: (state) => {
      state.setLanguageOpen = !state.setLanguageOpen;
    },
  },
});

export const {
  toggleResetPasswordOpen,
  toggleSidebarOpen,
  toggleCreateAccountOpen,
  toggleDeleteAccountOpen,
  toggleUserAccountMenuOpen,
  toggleSetUsernameOpen,
  toggleCreateIncomeOpen,
  toggleCreateExpenseOpen,
  toggleCreateTransferOpen,
  toggleTransfersMeunOpen,
  toggleSettingsMenuOpen,
  toggleAccountsOpen,
  toggleTransactionCategoriesOpen,
  setCategoryType,
  toggleChangePasswordOpen,
  toggleSetLanguageOpen,
} = appSlice.actions;

export default appSlice.reducer;
