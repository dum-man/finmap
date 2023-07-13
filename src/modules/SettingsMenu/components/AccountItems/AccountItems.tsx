import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import useAppDispatch from "hooks/useAppDispatch";
import { auth } from "app/config";
import {
  setCategoryType,
  toggleAccountsOpen,
  toggleCategoriesOpen,
} from "app/slices/appSlice";
import styles from "./AccountItems.module.scss";

const AccountItems: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const handleSetIncomeCategory = () => {
    dispatch(toggleCategoriesOpen(true));
    dispatch(setCategoryType("income"));
  };

  const handleSetExpenseCategory = () => {
    dispatch(toggleCategoriesOpen(true));
    dispatch(setCategoryType("expense"));
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{currentUser?.displayName || t("accountType")}</h3>
      <ul>
        <li>
          <button
            className={styles.button}
            onClick={() => dispatch(toggleAccountsOpen(true))}
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
