import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import Chart from "../UI/Chart/Chart";
import { transactionsState } from "../../app/atoms/transactionsAtom";
import {
  getLabels,
  getLabelsData,
  getTotalSum,
  setExpenseColor,
  setIncomeColor,
} from "../../utils/chartUtils";
import { setFormattedAmount } from "../../utils";
import { Transaction } from "../../types";
import styles from "./Charts.module.scss";

const Charts: React.FC = () => {
  const { t } = useTranslation();

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

  const incomeLabelsData = getLabelsData(incomeTransactions);
  const expenseLabelsData = getLabelsData(expenseTransactions);

  const incomeLabels = getLabels(incomeLabelsData, incomeTransactions);
  const expenseLabels = getLabels(expenseLabelsData, expenseTransactions);

  return (
    <div className={styles.container}>
      <h2 className="visually-hidden">Analytics</h2>
      <div className={styles.wrapper}>
        <span className={`${styles.totalSum} ${styles.income}`}>
          {setFormattedAmount(getTotalSum(incomeTransactions))}
        </span>
        <Chart transactions={incomeTransactions} type="income" />
        <ul className={styles.categoryList}>
          {incomeLabels.map((label) => (
            <li key={label.category} className={styles.categoryItem}>
              <p>
                <span
                  className={styles.categoryColor}
                  style={{
                    backgroundColor: setIncomeColor(label.category),
                  }}
                />
                {label.category}
              </p>
              <span className={styles.percentage}>{label.percent.toFixed(2)}%</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.wrapper}>
        <span className={`${styles.totalSum} ${styles.expense}`}>
          {setFormattedAmount(getTotalSum(expenseTransactions))}
        </span>
        <Chart transactions={expenseTransactions} type="expense" />
        <ul className={styles.categoryList}>
          {expenseLabels.map((label) => (
            <li key={label.category} className={styles.categoryItem}>
              <p>
                <span
                  className={styles.categoryColor}
                  style={{
                    backgroundColor: setExpenseColor(label.category),
                  }}
                />
                {t(label.category) || label.category}
              </p>
              <span className={styles.percentage}>{Math.round(label.percent)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Charts;
