import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";
import useAppContext from "../../../../hooks/useAppContext";
import { setFormattedAmount } from "../../../../utils/setFormattedAmount";
import { Account } from "../../../../types";
import styles from "./Accounts.module.scss";

interface AccountsProps {
  accounts: Account[];
}

const Accounts: React.FC<AccountsProps> = ({ accounts }) => {
  const { t } = useTranslation();

  const { selectedAccounts, setSelectedAccounts } = useAppContext();

  const isAccountSelected = (account: Account) => {
    return selectedAccounts.includes(account);
  };

  const onSelectAccounts = (account: Account) => {
    if (isAccountSelected(account)) {
      setSelectedAccounts((prev) => prev.filter((acc) => acc.id !== account.id));
    } else {
      setSelectedAccounts((prev) => [...prev, account]);
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
            onClick={() => onSelectAccounts(account)}
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
