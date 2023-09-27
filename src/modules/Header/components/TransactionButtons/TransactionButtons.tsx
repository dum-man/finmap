import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { BiTransfer } from "react-icons/bi";
import { FiMinus, FiPlus } from "react-icons/fi";
import useAppDispatch from "hooks/useAppDispatch";
import {
  toggleCreateExpenseOpen,
  toggleCreateIncomeOpen,
  toggleCreateTransferOpen,
} from "app/slices/appSlice";
import styles from "./TransactionButtons.module.css";

const TransactionButtons: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  return (
    <ul className={styles["transaction-buttons"]}>
      <li>
        <button
          className={classNames(styles["button"], styles["button-income"])}
          onClick={() => dispatch(toggleCreateIncomeOpen(true))}
        >
          <FiPlus />
          <span>{t("income")}</span>
        </button>
      </li>
      <li>
        <button
          className={classNames(styles["button"], styles["button-expense"])}
          onClick={() => dispatch(toggleCreateExpenseOpen(true))}
        >
          <FiMinus />
          <span>{t("expense")}</span>
        </button>
      </li>
      <li>
        <button
          className={classNames(styles["button"], styles["button-transfer"])}
          onClick={() => dispatch(toggleCreateTransferOpen(true))}
        >
          <BiTransfer />
          <span>{t("transfer")}</span>
        </button>
      </li>
    </ul>
  );
};

export default TransactionButtons;
