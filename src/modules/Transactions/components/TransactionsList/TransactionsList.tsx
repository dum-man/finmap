import { useContext } from "react";
import TransactionItem from "../TransactionItem/TransactionItem";
import { Context } from "../ScrollToTop/ScrollToTop";
import { Transaction } from "types";
import styles from "./TransactionsList.module.css";

interface TransactionsListProps {
  transactions: Transaction[];
}

const TransactionsList: React.FC<TransactionsListProps> = ({ transactions }) => {
  const listRef = useContext(Context);

  return (
    <ul className={styles["transactions-list"]}>
      {transactions.map((transaction, index) => {
        if (index === 0) {
          return (
            <TransactionItem
              ref={listRef}
              key={transaction.id}
              transaction={transaction}
            />
          );
        }
        return <TransactionItem key={transaction.id} transaction={transaction} />;
      })}
    </ul>
  );
};

export default TransactionsList;
