import { Transaction } from "types";

interface Label {
  category: string;
  total: number;
  percent: number;
}

export const getTotalSum = (transactions: Transaction[]) => {
  return transactions.reduce((acc, current) => acc + current.amount, 0);
};

export const getLabelsData = (transactions: Transaction[]) => {
  return transactions.reduce<Label[]>((acc, current) => {
    const prev = acc.find((item) => item.category === current.category);

    if (prev) {
      prev.total += current.amount;
      return acc;
    }

    acc.push({
      category: current.category,
      total: current.amount,
      percent: 0,
    });

    return acc;
  }, []);
};

export const getLabels = (labelsData: Label[], transactions: Transaction[]) => {
  return labelsData.map((label) => ({
    ...label,
    percent: (100 * label.total) / getTotalSum(transactions),
  }));
};

const getSum = (arr: Transaction[]) => {
  const map: {
    [category: string]: number;
  } = {};
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (!map[arr[i].category]) {
      map[arr[i].category] = 0;
    }
    map[arr[i].category] += arr[i].amount;
  }

  for (let item of Object.values(map)) {
    result.push(item);
  }

  return result;
};

export const getChartData = (transactions: Transaction[], type: string) => {
  const bgColors = Array.from(
    new Set(
      transactions.map((transaction) =>
        type === "income"
          ? setIncomeColor(transaction.category)
          : setExpenseColor(transaction.category)
      )
    )
  );

  const labelsData = Array.from(
    new Set(transactions.map((transaction) => transaction.category))
  );

  const config = {
    data: {
      labels: labelsData,
      datasets: [
        {
          data: getSum(transactions),
          backgroundColor: bgColors,
          hoverOffset: 4,
          spacing: 2,
        },
      ],
    },
    options: {
      cutout: 115,
    },
  };
  return config;
};

const setExpenseColor = (category: string) => {
  switch (category) {
    case "Taxes":
      return "#2a9d8f";
    case "Credit repayment":
      return "#ed1b24";
    case "Rent":
      return "#4a88f7";
    case "Commission":
      return "#8f8f8f";
    case "Dividends":
      return "#f4a261";
    case "Loan granted":
      return "#e76f51";
    default:
      return "#4c4c4c";
  }
};
const setIncomeColor = (category: string) => {
  switch (category) {
    case "Salary":
      return "#4a88f7";
    case "Part-time job":
      return "#f4a261";
    case "Investments":
      return "#2a9d8f";
    case "Loan repayment":
      return "#e76f51";
    case "Received credit":
      return "#cee497";
    case "Financial reward":
      return "#f3db00";
    default:
      return "#4c4c4c";
  }
};

export const setCategoryColor = (type: "income" | "expense", category: string) => {
  if (type === "income") {
    return setIncomeColor(category);
  }
  return setExpenseColor(category);
};
