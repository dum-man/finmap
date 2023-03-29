import { Transaction } from "../../../types";
import { isDaysSame } from "../../../utils";

interface Event {
  title: string;
  balance: number;
  type: string;
  start: Date;
  end: Date;
}

export const getTransactionEvents = (transactions: Transaction[]) => {
  return transactions.reduce<Event[]>((acc, current) => {
    const currentDate = current.createdAt.toDate();

    const prev = acc.find(
      (item: Event) => isDaysSame(item.start, currentDate) && item.type === current.type
    );

    if (prev) {
      prev.balance += current.amount;
      return acc;
    }

    const map = {
      title: current.accountName,
      balance: current.amount,
      type: current.type,
      start: currentDate,
      end: currentDate,
    };
    acc.push(map);

    return acc;
  }, []);
};
