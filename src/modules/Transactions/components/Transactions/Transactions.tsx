import { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Loader } from "../../../../ui";
import TransactionItem from "../TransactionItem/TransactionItem";
import Filtration from "../Filtration/Filtration";
import Sorting from "../Sorting/Sorting";
import NotFound from "../NotFound/NotFound";
import UpButton from "../UpButton/UpButton";
import useAppContext from "../../../../hooks/useAppContext";
import { useFilterTranscations } from "../../../../hooks/useFilterTranscations";
import { useSortTransactions } from "../../../../hooks/useSortTransactions";
import useIntersectionObserver from "../../../../hooks/useIntersectionObserver";
import { useGetTransactionsQuery } from "../../../../app/services/transactionApi";
import { auth } from "../../../../firebase";
import styles from "./Transactions.module.scss";

const Transactions: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const { selectedAccounts, sortState, selectedOption, searchQuery, selectedDates } =
    useAppContext();

  const { data: transactions = [], isLoading } = useGetTransactionsQuery(
    currentUser?.uid as string
  );

  const sortedTransactions = useSortTransactions(sortState, transactions);

  const filteredTransactions = useFilterTranscations(sortedTransactions, {
    selectedAccounts,
    filterOption: selectedOption.label,
    searchQuery,
    selectedDates,
  });

  const firstTransactionRef = useRef<HTMLLIElement | null>(null);
  const entry = useIntersectionObserver(firstTransactionRef, isLoading, {});
  const isVisible = !!entry?.isIntersecting;

  const onScrollToTop = () => {
    firstTransactionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Filtration />
      {!transactions?.length ? (
        <NotFound />
      ) : (
        <>
          {!filteredTransactions.length ? (
            <NotFound filtered />
          ) : (
            <>
              <Sorting />
              <ul className={styles.transactionsList}>
                {filteredTransactions.map((transaction, index) => {
                  if (index === 0) {
                    return (
                      <TransactionItem
                        ref={firstTransactionRef}
                        key={transaction.id}
                        transaction={transaction}
                      />
                    );
                  } else if (filteredTransactions.length - 2 === index) {
                    return (
                      <TransactionItem key={transaction.id} transaction={transaction} />
                    );
                  }
                  return (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                  );
                })}
              </ul>
              {entry && <UpButton isVisible={isVisible} onClick={onScrollToTop} />}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Transactions;
