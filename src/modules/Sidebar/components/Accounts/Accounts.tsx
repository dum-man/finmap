import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";
import { setFormattedAmount } from "utils/setFormattedAmount";
import { addSelectedAccount, removeSelectedAccount } from "app/slices/filterSlice";
import { Account } from "types";
import { RootState } from "app/store";
import styles from "./Accounts.module.scss";

interface AccountsProps {
  accounts: Account[];
}

const Accounts: React.FC<AccountsProps> = ({ accounts }) => {
  const { t } = useTranslation();

  const { selectedAccounts } = useSelector((state: RootState) => state.filter);

  const isAccountSelected = (account: Account) => {
    return selectedAccounts.includes(account);
  };

  const dispatch = useDispatch();

  const handleSelectAccounts = (account: Account) => {
    if (isAccountSelected(account)) {
      dispatch(removeSelectedAccount(account));
    } else {
      dispatch(addSelectedAccount(account));
    }
  };

  return (
    <ul className={styles.accountsList}>
      <AnimatePresence>
        {accounts.map((account) => (
          <motion.li
            key={account.id}
            className={classNames(styles.accountItem, {
              [styles.selected]: isAccountSelected(account),
            })}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => handleSelectAccounts(account)}
          >
            <p>{account.group === "base" ? t(account.name) : account.name}</p>
            {setFormattedAmount(account.balance)}
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default Accounts;
