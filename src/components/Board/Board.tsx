import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { transactionsState } from "../../app/atoms/transactionsAtom";
import notFoundImage from "../../assets/images/not-found.svg";
import Calendar from "../../components/Calendar/Calendar";
import Charts from "../../components/Charts/Charts";
import Loader from "../../components/UI/Loader/Loader";
import useAppContext from "../../hooks/useAppContext";
import { useFilterTranscations } from "../../hooks/useFilterTranscations";
import { useSortTransactions } from "../../hooks/useSortTransactions";
import FilterMenu from "../FilterMenu/FilterMenu";
import Navigation from "../Navigation/Navigation";
import SortMenu from "../SortMenu/SortMenu";
import TransactionList from "../TransactionList/TransactionList";
import styles from "./Board.module.scss";

const Board: React.FC = () => {
  const { t } = useTranslation();

  const { transactions, isFetching } = useRecoilValue(transactionsState);

  const {
    selectedAccounts,
    selectedTab,
    sortState,
    filterMenuOpen,
    setFilterMenuOpen,
    selectedOption,
    searchQuery,
    selectedDates,
  } = useAppContext();

  const sortedTransactions = useSortTransactions(sortState, transactions);

  const filteredTransactions = useFilterTranscations(sortedTransactions, {
    selectedAccounts,
    filterOption: selectedOption.label,
    searchQuery,
    selectedDates,
  });

  return (
    <section className={styles.wrapper}>
      <Navigation />
      {selectedTab === "actions" && (
        <>
          <div
            className={`${styles.filterMenuWrapper} ${
              filterMenuOpen ? styles.visible : styles.hidden
            }`}
          >
            <FilterMenu />
          </div>
          <div className={styles.bar}>
            <button onClick={() => setFilterMenuOpen((prev) => !prev)} />
          </div>
          {isFetching ? (
            <Loader />
          ) : (
            <>
              {!transactions.length ? (
                <div className={styles.notFound}>
                  <img src={notFoundImage} alt="sun and sea" />
                  <p>{t("noTransactionsFound")}</p>
                  <p>{t("noTransactionsFoundMessage")}</p>
                </div>
              ) : (
                <>
                  {!filteredTransactions.length ? (
                    <div className={styles.notFound}>
                      <img src={notFoundImage} alt="sun and sea" />
                      <p>{t("noSuchTransactions")}</p>
                      <p>{t("noSuchTransactionsMessage")}</p>
                    </div>
                  ) : (
                    <>
                      <SortMenu />
                      <TransactionList transactions={filteredTransactions} />
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
      {selectedTab === "analytics" && <Charts />}
      {selectedTab === "calendar" && <Calendar />}
    </section>
  );
};

export default Board;
