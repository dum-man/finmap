import { atom } from "recoil";
import { Account } from "../../types";

interface AccountsState {
  accounts: Account[];
}

const defaultAccountsState: AccountsState = {
  accounts: [],
};

export const accountsState = atom<AccountsState>({
  key: "accountsState",
  default: defaultAccountsState,
});
