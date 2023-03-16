import { useTranslation } from "react-i18next";
import { TbCash, TbCashOff } from "react-icons/tb";
import { setFormattedAmount } from "../../utils";
import { setFormattedDate, setFormattedTime } from "../../utils/dateUtils";
import { Transaction } from "../../types";
import styles from "./TransactionList.module.scss";

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const { t } = useTranslation();

  return (
    <ul className={styles.transactionList}>
      {transactions.map((transaction) => (
        <li key={transaction.id} className={styles.transactionItem}>
          <p
            className={`${styles.transactionType} ${
              transaction.type === "income" ? styles.income : styles.expense
            }`}
          >
            {transaction.type === "income" ? <TbCash /> : <TbCashOff />}
          </p>
          <p className={styles.transactionValue}>
            <span>{setFormattedDate(transaction.createdAt.toDate())}</span>
            <span>{setFormattedTime(transaction.createdAt.toDate())}</span>
          </p>
          <p
            className={`${styles.transactionValue} ${
              transaction.type === "income" ? styles.income : styles.expense
            }`}
          >
            {setFormattedAmount(transaction.amount)}
          </p>
          <p className={styles.transactionValue}>
            <span>{t(transaction.accountName) || transaction.accountName}</span>
            <span>{setFormattedAmount(transaction.accountAmount)}</span>
          </p>
          <p className={styles.transactionValue}>
            {t(transaction.category) || transaction.category}
          </p>
          <p className={styles.transactionValue}>{transaction.comment}</p>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
