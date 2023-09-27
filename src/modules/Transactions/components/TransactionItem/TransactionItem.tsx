import React from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { TbCash, TbCashOff } from "react-icons/tb";
import { setFormattedAmount } from "utils/sumUtils/setFormattedAmount";
import { setFormattedDate, setFormattedTime } from "utils/dateUtils";
import { Transaction } from "types";
import styles from "./TransactionItem.module.css";

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem = React.forwardRef<HTMLLIElement, TransactionItemProps>(
  ({ transaction }, ref) => {
    const {
      type,
      createdAt,
      amount,
      accountName,
      accountAmount,
      accountCurrency,
      category,
      comment,
    } = transaction;

    const { t } = useTranslation();

    return (
      <li className={styles["transaction-item"]} ref={ref}>
        <p
          className={classNames(styles["type"], {
            [styles["income"]]: type === "income",
            [styles["expense"]]: type === "expense",
          })}
        >
          {type === "income" ? <TbCash /> : <TbCashOff />}
        </p>
        <p className={styles["date"]}>
          <span>{setFormattedDate(createdAt.toDate())}</span>
          <span>{setFormattedTime(createdAt.toDate())}</span>
        </p>
        <p
          className={classNames(styles["amount"], {
            [styles["income"]]: type === "income",
            [styles["expense"]]: type === "expense",
          })}
        >
          {setFormattedAmount(amount, accountCurrency)}
        </p>
        <p className={styles["account"]}>
          <span>{t(accountName) || accountName}</span>
          <span>{setFormattedAmount(accountAmount, accountCurrency)}</span>
        </p>
        <p className={styles["category"]}>{t(category) || category}</p>
        <p className={styles["comment"]}>{comment}</p>
      </li>
    );
  }
);

export default TransactionItem;
