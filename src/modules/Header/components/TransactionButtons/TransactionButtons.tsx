import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { BiTransfer } from "react-icons/bi";
import { FiMinus, FiPlus } from "react-icons/fi";
import styles from "./TransactionButtons.module.scss";

interface TransactionButtonsProps {
  setCreateIncomeOpen: (open: React.SetStateAction<boolean>) => void;
  setCreateExpenseOpen: (open: React.SetStateAction<boolean>) => void;
  setCreateTransferOpen: (open: React.SetStateAction<boolean>) => void;
}

const TransactionButtons: React.FC<TransactionButtonsProps> = ({
  setCreateIncomeOpen,
  setCreateExpenseOpen,
  setCreateTransferOpen,
}) => {
  const { t } = useTranslation();

  return (
    <ul className={styles.transactionButtons}>
      <li>
        <button
          className={classNames(styles.button, styles.buttonIncome)}
          onClick={() => setCreateIncomeOpen(true)}
        >
          <FiPlus />
          <span>{t("income")}</span>
        </button>
      </li>
      <li>
        <button
          className={classNames(styles.button, styles.buttonExpense)}
          onClick={() => setCreateExpenseOpen(true)}
        >
          <FiMinus />
          <span>{t("expense")}</span>
        </button>
      </li>
      <li>
        <button
          className={classNames(styles.button, styles.buttonTransfer)}
          onClick={() => setCreateTransferOpen(true)}
        >
          <BiTransfer />
          <span>{t("transfer")}</span>
        </button>
      </li>
    </ul>
  );
};

export default TransactionButtons;
