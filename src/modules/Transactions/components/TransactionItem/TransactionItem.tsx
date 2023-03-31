import { useTranslation } from "react-i18next";
import { TbCash, TbCashOff } from "react-icons/tb";
import { Transaction } from "../../../../types";
import { setFormattedAmount } from "../../../../utils/setFormattedAmount";
import { setFormattedDate } from "../../../../utils";
import { setFormattedTime } from "../../helpers";
import styles from "./TransactionItem.module.scss";

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const { type, createdAt, amount, accountName, accountAmount, category, comment } =
    transaction;

  const { t } = useTranslation();

  return (
    <li className={styles.transactionItem}>
      <p
        className={`${styles.type} ${type === "income" ? styles.income : styles.expense}`}
      >
        {type === "income" ? <TbCash /> : <TbCashOff />}
      </p>
      <p className={styles.date}>
        <span>{setFormattedDate(createdAt.toDate())}</span>
        <span>{setFormattedTime(createdAt.toDate())}</span>
      </p>
      <p
        className={`${styles.amount} ${
          type === "income" ? styles.income : styles.expense
        }`}
      >
        {setFormattedAmount(amount)}
      </p>
      <p className={styles.account}>
        <span>{t(accountName) || accountName}</span>
        <span>{setFormattedAmount(accountAmount)}</span>
      </p>
      <p className={styles.category}>{t(category) || category}</p>
      <p className={styles.comment}>{comment}</p>
    </li>
  );
};

export default TransactionItem;
