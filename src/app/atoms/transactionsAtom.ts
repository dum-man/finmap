import { atom } from "recoil";
import { Transaction } from "../../types";

interface TransactionsState {
  transactions: Transaction[];
  isFetching: boolean;
}

const defaultTransactionsState: TransactionsState = {
  transactions: [],
  isFetching: true,
};

export const transactionsState = atom<TransactionsState>({
  key: "transactionsState",
  default: defaultTransactionsState,
});
