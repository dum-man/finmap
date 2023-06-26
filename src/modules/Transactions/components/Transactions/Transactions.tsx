import { useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { Loader } from "../../../../ui";
import Filtration from "../Filtration/Filtration";
import Sorting from "../Sorting/Sorting";
import NotFound from "../NotFound/NotFound";
import { useGetTransactionsQuery } from "../../../../app/services/transactionApi";
import { sortTransactions } from "../../../../utils/sortTransactions";
import { filterTranscations } from "../../../../utils/filterTranscations";
import { auth } from "../../../../firebase";
import { RootState } from "../../../../app/store";
import TransactionsList from "../TransactionsList/TransactionsList";

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
    filterOption: selectedOption.label,
    searchQuery,
    selectedDates,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Filtration />
      {!transactions?.length || !filteredTransactions.length ? (
        <NotFound noMatches={!!transactions?.length && !filteredTransactions.length} />
      ) : (
        <>
          <Sorting />
          <TransactionsList transactions={filteredTransactions} />
        </>
      )}
    </>
  );
};

export default Transactions;
