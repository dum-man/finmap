import { sortByDate } from "../utils";
import { SortState, Transaction } from "../types";

const sortTransactionsByType = (type: string, transactions: Transaction[]) => {
  switch (type) {
    case "up":
      return [...transactions].sort((a, b) => (a.type > b.type ? 1 : -1));
    case "down":
      return [...transactions].sort((a, b) => (a.type > b.type ? -1 : 1));
    default:
      return transactions;
  }
};

const sortTransactionsByDate = (type: string, transactions: Transaction[]) => {
  switch (type) {
    case "up":
      return [...transactions].sort((dateA, dateB) =>
        sortByDate(dateA.createdAt.toDate(), dateB.createdAt.toDate())
      );
    case "down":
      return [...transactions].sort((dateA, dateB) =>
        sortByDate(dateB.createdAt.toDate(), dateA.createdAt.toDate())
      );
    default:
      return transactions;
  }
};

const sortTransactionsByAmount = (type: string, transactions: Transaction[]) => {
  switch (type) {
    case "up":
      return [...transactions].sort((a, b) => a.amount - b.amount);
    case "down":
      return [...transactions].sort((a, b) => b.amount - a.amount);
    default:
      return transactions;
  }
};

export const useSortTransactions = (
  state: SortState,
  transactions: Transaction[] | undefined
) => {
  if (!transactions) {
    return [];
  }
  if (state.transcationType) {
    return sortTransactionsByType(state.transcationType, transactions);
  } else if (state.dateType) {
    return sortTransactionsByDate(state.dateType, transactions);
  } else if (state.amountType) {
    return sortTransactionsByAmount(state.amountType, transactions);
  } else {
    return transactions;
  }
};
