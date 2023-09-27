import { ArcElement, Chart as ChartJS, Tooltip } from "chart.js";
import ChartItem from "../ChartItem/ChartItem";
import styles from "./Charts.module.css";

ChartJS.register(ArcElement, Tooltip);

const Charts: React.FC = () => {
  return (
    <div className={styles["container"]}>
      <h2 className="visually-hidden">Analytics</h2>
      <ChartItem type="income" />
      <ChartItem type="expense" />
    </div>
  );
};

export default Charts;
