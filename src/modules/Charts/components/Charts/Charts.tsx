import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ArcElement, Chart as ChartJS, Tooltip } from "chart.js";
import ChartItem from "../ChartItem/ChartItem";
import { auth } from "app/config";
import { useGetTransactionsQuery } from "app/services/transactionApi";
import { Transaction } from "types";
import styles from "./Charts.module.scss";

ChartJS.register(ArcElement, Tooltip);

const Charts: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const { data: transactions = [] } = useGetTransactionsQuery(currentUser?.uid as string);

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
