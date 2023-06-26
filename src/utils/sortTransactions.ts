import { SortState, Transaction } from "../types";
import { sortByDate } from "./utils";

const sortTransactionsByType = (type: string, transactions: Transaction[]) => {
  switch (type) {
    case "UP":
      return [...transactions].sort((a, b) => (a.type > b.type ? 1 : -1));
    case "DOWN":
      return [...transactions].sort((a, b) => (a.type > b.type ? -1 : 1));
    default:
      return transactions;
  }
};

const sortTransactionsByDate = (type: string, transactions: Transaction[]) => {
  switch (type) {
    case "UP":
      return [...transactions].sort((dateA, dateB) =>
        sortByDate(dateA.createdAt.toDate(), dateB.createdAt.toDate())
      );
    case "DOWN":
      return [...transactions].sort((dateA, dateB) =>
        sortByDate(dateB.createdAt.toDate(), dateA.createdAt.toDate())
      );
    default:
      return transactions;
  }
};

const sortTransactionsByAmount = (type: string, transactions: Transaction[]) => {
  switch (type) {
    case "UP":
      return [...transactions].sort((a, b) => a.amount - b.amount);
    case "DOWN":
      return [...transactions].sort((a, b) => b.amount - a.amount);
    default:
      return transactions;
  }
};

export const sortTransactions = (state: SortState, transactions: Transaction[]) => {
  if (state.transcationType !== "DEFAULT") {
    return sortTransactionsByType(state.transcationType, transactions);
  } else if (state.dateType !== "DEFAULT") {
    return sortTransactionsByDate(state.dateType, transactions);
  } else if (state.amountType !== "DEFAULT") {
    return sortTransactionsByAmount(state.amountType, transactions);
  } else {
    return transactions;
  }
};
