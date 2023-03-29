import { filterByDate, filterByWeek, filterByMonth } from "../utils";
import { Account, DatepickerDate, Transaction } from "../types";

interface DateOptions {
  filterOption: string;
  selectedDates: DatepickerDate;
}

interface FilterOptions {
  selectedAccounts: Account[];
  filterOption: string;
  selectedDates: DatepickerDate;
  searchQuery: string;
}

const selectTransactions = (transactions: Transaction[], selectedAccounts: Account[]) => {
  if (!selectedAccounts.length) {
    return transactions;
  }
  return transactions?.filter((transaction) =>
    selectedAccounts.some((account) => account.id === transaction.accountId)
  );
};

const filterTransactionsByDate = (
  transactions: Transaction[],
  options: DateOptions
): Transaction[] => {
  const { filterOption, selectedDates } = options;

  switch (filterOption) {
    case "currentWeek":
      return [...transactions].filter((transaction) =>
        filterByWeek(transaction.createdAt.toDate(), 0)
      );
    case "previousWeek":
      return [...transactions].filter((transaction) =>
        filterByWeek(transaction.createdAt.toDate(), 1)
      );
    case "currentMonth":
      return [...transactions].filter((transaction) =>
        filterByMonth(transaction.createdAt.toDate())
      );
    case "previousMonth":
      return [...transactions].filter((transaction) =>
        filterByMonth(transaction.createdAt.toDate(), 1)
      );
    case "selectDates":
      if (Array.isArray(selectedDates)) {
        const [startDate, endDate] = selectedDates;
        return [...transactions].filter((transaction) =>
          filterByDate(transaction.createdAt.toDate(), startDate, endDate)
        );
      } else {
        return transactions;
      }
    default:
      return transactions;
  }
};

const searchTransactions = (transactions: Transaction[], query: string) => {
  if (!query) {
    return transactions;
  }
  const formattedQuery = query.toLowerCase();
  return transactions.filter(
    (transaction) =>
      transaction.accountName.toLowerCase().includes(formattedQuery) ||
      transaction.category.toLowerCase().includes(formattedQuery) ||
      transaction.comment?.toLowerCase().includes(formattedQuery)
  );
};

export const useFilterTranscations = (
  transactions: Transaction[],
  options: FilterOptions
) => {
  const { selectedAccounts, searchQuery, filterOption, selectedDates } = options;

  const selectedTransactions = selectTransactions(transactions, selectedAccounts);

  const searchedTransactions = searchTransactions(selectedTransactions, searchQuery);

  return filterTransactionsByDate(searchedTransactions, {
    filterOption,
    selectedDates,
  });
};
