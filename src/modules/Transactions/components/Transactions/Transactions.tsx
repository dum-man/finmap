import { useAuthState } from "react-firebase-hooks/auth";
import useAppSelector from "hooks/useAppSelector";
import { Loader } from "ui";
import Filtration from "../Filtration/Filtration";
import Sorting from "../Sorting/Sorting";
import NotFound from "../NotFound/NotFound";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import TransactionsList from "../TransactionsList/TransactionsList";
import { useGetTransactionsQuery } from "app/services/transactionApi";
import { sortTransactions } from "utils/transactionUtils/sortTransactions";
import { filterTransactions } from "utils/transactionUtils/filterTransactions";
import { auth } from "app/config";

const Transactions: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const { selectedAccountIds, selectedOption, searchQuery, selectedDates } =
    useAppSelector((state) => state.filter);

  const sortState = useAppSelector((state) => state.sort);

  const { data: transactions = [], isLoading } = useGetTransactionsQuery({
    userId: currentUser?.uid!,
  });

  const sortedTransactions = sortTransactions(sortState, transactions);

  const filteredTransactions = filterTransactions(sortedTransactions, {
    selectedAccountIds,
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
        <NotFound
          noMatches={Boolean(transactions.length) && !filteredTransactions.length}
        />
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
