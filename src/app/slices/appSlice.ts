import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CategoryType } from "types";

export interface AppState {
  sidebarOpen: boolean;
  resetPasswordOpen: boolean;
  createAccountOpen: boolean;
  deleteAccountOpen: boolean;
  userAccountMenuOpen: boolean;
  setUsernameOpen: boolean;
  createIncomeOpen: boolean;
  createExpenseOpen: boolean;
  createTransferOpen: boolean;
  transfersMenuOpen: boolean;
  settingsMenuOpen: boolean;
  accountsOpen: boolean;
  categoriesOpen: boolean;
  categoryType: CategoryType;
  changePasswordOpen: boolean;
  setLanguageOpen: boolean;
}

const initialState: AppState = {
  sidebarOpen: window.matchMedia("(min-width: 768px)").matches,
  resetPasswordOpen: false,
  createAccountOpen: false,
  deleteAccountOpen: false,
  userAccountMenuOpen: false,
  setUsernameOpen: false,
  createIncomeOpen: false,
  createExpenseOpen: false,
  createTransferOpen: false,
  transfersMenuOpen: false,
  settingsMenuOpen: false,
  accountsOpen: false,
  categoriesOpen: false,
  categoryType: null,
  changePasswordOpen: false,
  setLanguageOpen: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSidebarOpen: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    toggleResetPasswordOpen: (state, { payload: isOpen }: PayloadAction<boolean>) => {
      state.resetPasswordOpen = isOpen;
    },
    toggleCreateAccountOpen: (state, { payload: isOpen }: PayloadAction<boolean>) => {
      state.createAccountOpen = isOpen;
    },
    toggleDeleteAccountOpen: (state, { payload: isOpen }: PayloadAction<boolean>) => {
      state.deleteAccountOpen = isOpen;
    },
    toggleUserAccountMenuOpen: (state, { payload: isOpen }: PayloadAction<boolean>) => {
      state.userAccountMenuOpen = isOpen;
    },
    toggleSetUsernameOpen: (state, { payload: isOpen }: PayloadAction<boolean>) => {
      state.setUsernameOpen = isOpen;
    },
    toggleCreateIncomeOpen: (state, { payload: isOpen }: PayloadAction<boolean>) => {
      state.createIncomeOpen = isOpen;
    },
    toggleCreateExpenseOpen: (state, { payload: isOpen }: PayloadAction<boolean>) => {
      state.createExpenseOpen = isOpen;
    },
    toggleCreateTransferOpen: (state, { payload: isOpen }: PayloadAction<boolean>) => {
      state.createTransferOpen = isOpen;
    },
    toggleTransfersMenuOpen: (state, { payload: isOpen }: PayloadAction<boolean>) => {
      state.transfersMenuOpen = isOpen;
    },
    toggleSettingsMenuOpen: (state, { payload: isOpen }: PayloadAction<boolean>) => {
      state.settingsMenuOpen = isOpen;
    },
    toggleAccountsOpen: (state, { payload: isOpen }: PayloadAction<boolean>) => {
      state.accountsOpen = isOpen;
    },
    toggleChangePasswordOpen: (state, { payload: isOpen }: PayloadAction<boolean>) => {
      state.changePasswordOpen = isOpen;
    },
    toggleCategoriesOpen: (state, { payload: isOpen }: PayloadAction<boolean>) => {
      state.categoriesOpen = isOpen;
    },
    setCategoryType: (state, { payload: categoryType }: PayloadAction<CategoryType>) => {
      state.categoryType = categoryType;
    },
    toggleSetLanguageOpen: (state, { payload: isOpen }: PayloadAction<boolean>) => {
      state.setLanguageOpen = isOpen;
    },
  },
});

export const {
  toggleSidebarOpen,
  toggleResetPasswordOpen,
  toggleCreateAccountOpen,
  toggleDeleteAccountOpen,
  toggleUserAccountMenuOpen,
  toggleSetUsernameOpen,
  toggleCreateIncomeOpen,
  toggleCreateExpenseOpen,
  toggleCreateTransferOpen,
  toggleTransfersMenuOpen,
  toggleSettingsMenuOpen,
  toggleAccountsOpen,
  toggleCategoriesOpen,
  setCategoryType,
  toggleChangePasswordOpen,
  toggleSetLanguageOpen,
} = appSlice.actions;

export default appSlice.reducer;
