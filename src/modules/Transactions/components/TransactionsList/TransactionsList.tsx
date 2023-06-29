import { useRef } from "react";
import { Transaction } from "types";
import TransactionItem from "../TransactionItem/TransactionItem";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import UpButton from "../UpButton/UpButton";
import styles from "./TransactionsList.module.scss";

interface TransactionsListProps {
  transactions: Transaction[];
}

const TransactionsList: React.FC<TransactionsListProps> = ({ transactions }) => {
  const firstTransactionRef = useRef<HTMLLIElement | null>(null);
  const entry = useIntersectionObserver(firstTransactionRef, {});
  const isVisible = !!entry?.isIntersecting;

  const handleScrollToTop = () => {
    firstTransactionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <ul className={styles.list}>
        {transactions.map((transaction, index) => {
          if (index === 0) {
            return (
              <TransactionItem
                ref={firstTransactionRef}
                key={transaction.id}
                transaction={transaction}
              />
            );
          }
          return <TransactionItem key={transaction.id} transaction={transaction} />;
        })}
      </ul>
      {!!entry && <UpButton isVisible={isVisible} onClick={handleScrollToTop} />}
    </>
  );
};

export default TransactionsList;
