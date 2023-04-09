import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { auth } from "../../../../firebase";
import styles from "./AccountItems.module.scss";

interface AccountItemsProps {
  setAccountsOpen: (open: React.SetStateAction<boolean>) => void;
  setTransactionCategoriesOpen: (open: React.SetStateAction<boolean>) => void;
  setCategoryType: (
    category: React.SetStateAction<"income" | "expense" | undefined>
  ) => void;
}

const AccountItems: React.FC<AccountItemsProps> = ({
  setAccountsOpen,
  setTransactionCategoriesOpen,
  setCategoryType,
}) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const onSetIncomeCategory = () => {
    setTransactionCategoriesOpen(true);
    setCategoryType("income");
  };

  const onSetExpenseCategory = () => {
    setTransactionCategoriesOpen(true);
    setCategoryType("expense");
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{currentUser?.displayName || t("accountType")}</h3>
      <ul>
        <li>
          <button className={styles.button} onClick={() => setAccountsOpen(true)}>
            {t("accounts")}
          </button>
        </li>
        <li>
          <button className={styles.button} onClick={onSetIncomeCategory}>
            {t("incomeCategories")}
          </button>
        </li>
        <li>
          <button className={styles.button} onClick={onSetExpenseCategory}>
            {t("expenseCategories")}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AccountItems;
