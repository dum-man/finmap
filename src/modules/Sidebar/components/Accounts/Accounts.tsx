import { useTranslation } from "react-i18next";
import classNames from "classnames";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { setFormattedAmount } from "utils/sumUtils/setFormattedAmount";
import { addSelectedAccount, removeSelectedAccount } from "app/slices/filterSlice";
import { Account } from "types";
import { RootState } from "app/store";
import styles from "./Accounts.module.css";

interface AccountsProps {
  accounts: Account[];
}

const Accounts: React.FC<AccountsProps> = ({ accounts }) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const selectedAccountIds = useAppSelector(
    (state: RootState) => state.filter.selectedAccountIds
  );

  const isAccountSelected = (account: Account) => {
    return selectedAccountIds.includes(account.id);
  };

  const handleSelectAccounts = (account: Account) => {
    if (isAccountSelected(account)) {
      dispatch(removeSelectedAccount(account));
    } else {
      dispatch(addSelectedAccount(account));
    }
  };

  if (!accounts.length) {
    return <p className={styles["not-found"]}>{t("noAccounts")}</p>;
  }

  return (
    <ul className={styles["accounts-list"]}>
      {accounts.map((account) => (
        <li
          key={account.id}
          className={classNames(styles["account-item"], {
            [styles["selected"]]: isAccountSelected(account),
          })}
        >
          <button
            className={styles["account-item-button"]}
            onClick={() => handleSelectAccounts(account)}
          >
            <span>{account.group === "base" ? t(account.name) : account.name}</span>
            {setFormattedAmount(account.balance, account.currency)}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Accounts;
