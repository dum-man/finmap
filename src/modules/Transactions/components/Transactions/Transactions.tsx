import { useRecoilValue } from "recoil";
import { Loader } from "../../../../ui";
import TransactionItem from "../TransactionItem/TransactionItem";
import Filtration from "../Filtration/Filtration";
import Sorting from "../Sorting/Sorting";
import NotFound from "../NotFound/NotFound";
import useAppContext from "../../../../hooks/useAppContext";
import { transactionsState } from "../../../../app/atoms/transactionsAtom";
import { useFilterTranscations } from "../../../../hooks/useFilterTranscations";
import { useSortTransactions } from "../../../../hooks/useSortTransactions";
import styles from "./Transactions.module.scss";

const Transactions: React.FC = () => {
  const { transactions, isFetching } = useRecoilValue(transactionsState);

  const { selectedAccounts, sortState, selectedOption, searchQuery, selectedDates } =
    useAppContext();

  const sortedTransactions = useSortTransactions(sortState, transactions);

  const filteredTransactions = useFilterTranscations(sortedTransactions, {
    selectedAccounts,
    filterOption: selectedOption.label,
    searchQuery,
    selectedDates,
  });

  if (isFetching) {
    return <Loader />;
  }

  return (
    <>
      <Filtration />
      {!transactions.length ? (
        <NotFound />
      ) : (
        <>
          {!filteredTransactions.length ? (
            <NotFound filtered />
          ) : (
            <>
              <Sorting />
              <ul className={styles.transactionsList}>
                {filteredTransactions.map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Transactions;
