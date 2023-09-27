import { DatePickerDate, Transaction } from "types";
import { filterByDateRange, filterByMonth, filterByWeek } from "../dateUtils/index";

interface FilterOptions {
  selectedAccountIds: string[];
  filterOption: string;
  selectedDates: DatePickerDate;
  searchQuery: string;
}

interface DateOptions {
  filterOption: string;
  selectedDates: DatePickerDate;
}

const filterBySelectedTransactions = (
  transactions: Transaction[],
  selectedAccountIds: string[]
) => {
  if (!selectedAccountIds.length) {
    return transactions;
  }
  return transactions.filter((transaction) =>
    selectedAccountIds.some((id) => id === transaction.accountId)
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

export const filterTransactions = (
  transactions: Transaction[],
  options: FilterOptions
) => {
  const { selectedAccountIds, searchQuery, filterOption, selectedDates } = options;

  const selectedTransactions = filterBySelectedTransactions(
    transactions,
    selectedAccountIds
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
