import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import classNames from "classnames";
import { setFormattedAmount } from "../../../../utils/setFormattedAmount";
import {
  getChartData,
  getLabels,
  getLabelsData,
  getTotalSum,
  setCategoryColor,
} from "../../helpers";
import { Transaction } from "../../../../types";
import styles from "./ChartItem.module.scss";

interface ChartItemProps {
  type: "income" | "expense";
  transactions: Transaction[];
}

const ChartItem: React.FC<ChartItemProps> = ({ type, transactions }) => {
  const totalSum = useMemo(() => {
    return setFormattedAmount(getTotalSum(transactions));
  }, [transactions]);

  const labels = useMemo(() => {
    const labelsData = getLabelsData(transactions);
    return getLabels(labelsData, transactions);
  }, [transactions]);

  return (
    <div className={styles.wrapper}>
      <span className={classNames(styles.totalSum, styles[type])}>{totalSum}</span>
      <Doughnut {...getChartData(transactions, type)} />
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
