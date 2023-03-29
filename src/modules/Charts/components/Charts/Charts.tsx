import { useMemo } from "react";
import { ArcElement, Chart as ChartJS, Tooltip } from "chart.js";
import { useRecoilValue } from "recoil";
import { transactionsState } from "../../../../app/atoms/transactionsAtom";
import { Transaction } from "../../../../types";
import ChartItem from "../ChartItem/ChartItem";
import styles from "./Charts.module.scss";

ChartJS.register(ArcElement, Tooltip);

const Charts: React.FC = () => {
  const { transactions } = useRecoilValue(transactionsState);

  const incomeTransactions = useMemo(() => {
    return transactions.filter(
      (transaction: Transaction) => transaction.type === "income"
    );
  }, [transactions]);

  const expenseTransactions = useMemo(() => {
    return transactions.filter(
      (transaction: Transaction) => transaction.type === "expense"
    );
  }, [transactions]);

  return (
    <div className={styles.container}>
      <h2 className="visually-hidden">Analytics</h2>
      <ChartItem type="income" transactions={incomeTransactions} />
      <ChartItem type="expense" transactions={expenseTransactions} />
    </div>
  );
};

export default Charts;
