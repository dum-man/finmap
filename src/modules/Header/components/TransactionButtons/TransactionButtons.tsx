import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { BiTransfer } from "react-icons/bi";
import { FiMinus, FiPlus } from "react-icons/fi";
import {
  toggleCreateExpenseOpen,
  toggleCreateIncomeOpen,
  toggleCreateTransferOpen,
} from "app/slices/appSlice";
import styles from "./TransactionButtons.module.scss";

const TransactionButtons: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  return (
    <ul className={styles.transactionButtons}>
      <li>
        <button
          className={classNames(styles.button, styles.buttonIncome)}
          onClick={() => dispatch(toggleCreateIncomeOpen())}
        >
          <FiPlus />
          <span>{t("income")}</span>
        </button>
      </li>
      <li>
        <button
          className={classNames(styles.button, styles.buttonExpense)}
          onClick={() => dispatch(toggleCreateExpenseOpen())}
        >
          <FiMinus />
          <span>{t("expense")}</span>
        </button>
      </li>
      <li>
        <button
          className={classNames(styles.button, styles.buttonTransfer)}
          onClick={() => dispatch(toggleCreateTransferOpen())}
        >
          <BiTransfer />
          <span>{t("transfer")}</span>
        </button>
      </li>
    </ul>
  );
};

export default TransactionButtons;
