import { CategoryType, Transaction } from "types";

export const getFilteredTransactions = (
  transactions: Transaction[],
  type: CategoryType
) => transactions.filter((transaction) => transaction.type === type);
