import { useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { Loader } from "ui";
import Filtration from "../Filtration/Filtration";
import Sorting from "../Sorting/Sorting";
import NotFound from "../NotFound/NotFound";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import TransactionsList from "../TransactionsList/TransactionsList";
import { useGetTransactionsQuery } from "app/services/transactionApi";
import { sortTransactions } from "utils/sortTransactions";
import { filterTranscations } from "utils/filterTranscations";
import { auth } from "app/config";
import { RootState } from "app/store";

const Transactions: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const { selectedAccounts, selectedOption, searchQuery, selectedDates } = useSelector(
    (state: RootState) => state.filter
  );

  const sortState = useSelector((state: RootState) => state.sort);

  const { data: transactions = [], isLoading } = useGetTransactionsQuery(
    currentUser?.uid as string
  );

  const sortedTransactions = sortTransactions(sortState, transactions);

  const filteredTransactions = filterTranscations(sortedTransactions, {
    selectedAccounts,
    /// todo
    filterOption: selectedOption?.label!,
    searchQuery,
    selectedDates,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Filtration />
      {!transactions.length || !filteredTransactions.length ? (
        <NotFound noMatches={!!transactions.length && !filteredTransactions.length} />
      ) : (
        <>
          <Sorting />
          <ScrollToTop>
            <TransactionsList transactions={filteredTransactions} />
          </ScrollToTop>
        </>
      )}
    </>
  );
};

export default Transactions;
