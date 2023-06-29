import { Account, DatepickerDate, Transaction } from "types";
import { filterByDateRange, filterByMonth, filterByWeek } from "./index";

interface FilterOptions {
  selectedAccounts: Account[];
  filterOption: string;
  selectedDates: DatepickerDate;
  searchQuery: string;
}

interface DateOptions {
  filterOption: string;
  selectedDates: DatepickerDate;
}

const filterBySelectedTransactions = (
  transactions: Transaction[],
  selectedAccounts: Account[]
) => {
  if (!selectedAccounts.length) {
    return transactions;
  }
  return transactions.filter((transaction) =>
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
          filterByDateRange(transaction.createdAt.toDate(), startDate, endDate)
        );
      } else {
        return transactions;
      }
    default:
      return transactions;
  }
};

const filterTransactionsBySearchQuery = (transactions: Transaction[], query: string) => {
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

export const filterTranscations = (
  transactions: Transaction[],
  options: FilterOptions
) => {
  const { selectedAccounts, searchQuery, filterOption, selectedDates } = options;

  const selectedTransactions = filterBySelectedTransactions(
    transactions,
    selectedAccounts
  );

  const searchedTransactions = filterTransactionsBySearchQuery(
    selectedTransactions,
    searchQuery
  );

  return filterTransactionsByDate(searchedTransactions, {
    filterOption,
    selectedDates,
  });
};
