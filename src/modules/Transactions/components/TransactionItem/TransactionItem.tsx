import React from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { TbCash, TbCashOff } from "react-icons/tb";
import { setFormattedAmount } from "utils/setFormattedAmount";
import { setFormattedDate } from "utils";
import { setFormattedTime } from "../../helpers";
import { Transaction } from "types";
import styles from "./TransactionItem.module.scss";

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem = React.forwardRef<HTMLLIElement, TransactionItemProps>(
  ({ transaction }, ref) => {
    const { type, createdAt, amount, accountName, accountAmount, category, comment } =
      transaction;

    const { t } = useTranslation();

    return (
      <li className={styles.transactionItem} ref={ref}>
        <p
          className={classNames(styles.type, {
            [styles.income]: type === "income",
            [styles.expense]: type === "expense",
          })}
        >
          {type === "income" ? <TbCash /> : <TbCashOff />}
        </p>
        <p className={styles.date}>
          <span>{setFormattedDate(createdAt.toDate())}</span>
          <span>{setFormattedTime(createdAt.toDate())}</span>
        </p>
        <p
          className={classNames(styles.amount, {
            [styles.income]: type === "income",
            [styles.expense]: type === "expense",
          })}
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
  }
);

export default TransactionItem;
