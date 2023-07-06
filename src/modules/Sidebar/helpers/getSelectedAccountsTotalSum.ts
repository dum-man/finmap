import { Account } from "types";

export const getSelectedAccountsTotalSum = (accounts: Account[]) =>
  accounts.reduce((acc, current) => acc + current.balance, 0);
