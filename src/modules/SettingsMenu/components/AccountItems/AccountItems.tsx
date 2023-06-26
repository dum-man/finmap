import { useDispatch } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { auth } from "../../../../firebase";
import {
  setCategoryType,
  toggleAccountsOpen,
  toggleTransactionCategoriesOpen,
} from "../../../../app/slices/appSlice";
import styles from "./AccountItems.module.scss";

const AccountItems: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleSetIncomeCategory = () => {
    dispatch(toggleTransactionCategoriesOpen());
    dispatch(setCategoryType("income"));
  };

  const handleSetExpenseCategory = () => {
    dispatch(toggleTransactionCategoriesOpen());
    dispatch(setCategoryType("expense"));
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{currentUser?.displayName || t("accountType")}</h3>
      <ul>
        <li>
          <button
            className={styles.button}
            onClick={() => dispatch(toggleAccountsOpen())}
          >
            {t("accounts")}
          </button>
        </li>
        <li>
          <button className={styles.button} onClick={handleSetIncomeCategory}>
            {t("incomeCategories")}
          </button>
        </li>
        <li>
          <button className={styles.button} onClick={handleSetExpenseCategory}>
            {t("expenseCategories")}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AccountItems;
