import { Transaction } from "types";
import { isDaysSame } from "utils/dateUtils";

interface Event {
  title: string;
  balance: number;
  type: string;
  start: Date;
  end: Date;
}

export const getTransactionEvents = (transactions: Transaction[]) => {
  return transactions.reduce<Event[]>((prevTransactions, currentTransaction) => {
    const currentTransactionDate = currentTransaction.createdAt.toDate();

    const existingTransaction = prevTransactions.find(
      (item: Event) =>
        isDaysSame(item.start, currentTransactionDate) &&
        item.type === currentTransaction.type
    );

    if (existingTransaction) {
      existingTransaction.balance += currentTransaction.amount;
      return prevTransactions;
    }

    const map = {
      title: currentTransaction.accountName,
      balance: currentTransaction.amount,
      type: currentTransaction.type,
      start: currentTransactionDate,
      end: currentTransactionDate,
    };
    prevTransactions.push(map);

    return prevTransactions;
  }, []);
};
