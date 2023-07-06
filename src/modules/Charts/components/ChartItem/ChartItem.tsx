import { useAuthState } from "react-firebase-hooks/auth";
import { Doughnut } from "react-chartjs-2";
import classNames from "classnames";
import { setFormattedAmount } from "utils/setFormattedAmount";
import {
  getChartData,
  getLabels,
  getLabelsData,
  getTotalSum,
  setCategoryColor,
} from "../../helpers";
import { useGetTransactionsQuery } from "app/services/transactionApi";
import { auth } from "app/config";
import { getFilteredTransactions } from "../../helpers/getFilteredTransactions";
import styles from "./ChartItem.module.scss";

interface ChartItemProps {
  type: "income" | "expense";
}

const ChartItem: React.FC<ChartItemProps> = ({ type }) => {
  const [currentUser] = useAuthState(auth);

  const { data: transactions = [] } = useGetTransactionsQuery(currentUser?.uid as string);

  const filteredTransactions = getFilteredTransactions(transactions, type);

  const totalSum = getTotalSum(filteredTransactions);

  const labelsData = getLabelsData(filteredTransactions);

  const labels = getLabels(labelsData, filteredTransactions);

  return (
    <div className={styles.wrapper}>
      <span className={classNames(styles.totalSum, styles[type])}>
        {setFormattedAmount(totalSum)}
      </span>
      <Doughnut {...getChartData(filteredTransactions, type)} />
      <ul className={styles.categories}>
        {labels.map((label) => (
          <li key={label.category} className={styles.categoryItem}>
            <p>
              <span
                className={styles.color}
                style={{
                  backgroundColor: setCategoryColor(type, label.category),
                }}
              />
              {label.category}
            </p>
            <span className={styles.percentage}>{label.percent.toFixed(2)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChartItem;
