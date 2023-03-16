import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Transaction } from "../../../types";
import { getChartData } from "../../../utils/chartUtils";

ChartJS.register(ArcElement, Tooltip);

interface ChartProps {
  transactions: Transaction[];
  type: string;
}

const Chart: React.FC<ChartProps> = ({ transactions, type }) => {
  return <Doughnut {...getChartData(transactions, type)} />;
};

export default Chart;
