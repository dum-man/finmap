import { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { Trans, useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { GoPlus } from "react-icons/go";
import { BiEditAlt } from "react-icons/bi";
import CreateAccountModal from "../../components/Modals/CreateAccount/CreateAccount";
import DeleteAccountModal from "../../components/Modals/DeleteAccount/DeleteAccount";
import useAppContext from "../../hooks/useAppContext";
import { setFormattedAmount } from "../../utils";
import { accountsState } from "../../app/atoms/accountsAtom";
import { ACCOUNT_VARIANTS } from "../../app/constants";
import { Account } from "../../types";
import styles from "./Sidebar.module.scss";

const Sidebar: React.FC = () => {
  const { t } = useTranslation();

  const { accounts } = useRecoilValue(accountsState);

  const { sidebarOpen, selectedAccounts, setSelectedAccounts } = useAppContext();

  const [createAccountModalOpen, setCreateAccountModalOpen] = useState(false);
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);

  const accountsTotalSum = useMemo(() => {
    return accounts.reduce((acc, current) => acc + current.balance, 0);
  }, [accounts]);

  const selectedAccountsTotalSum = useMemo(() => {
    return selectedAccounts.reduce((acc, current) => acc + current.balance, 0);
  }, [selectedAccounts]);

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

  let count = selectedAccounts.length;
  let name = t(selectedAccounts.length === 1 ? "account" : "selectedAccounts");

  return (
    <>
      <section
        className={`${styles.container} ${sidebarOpen ? styles.opened : styles.closed}`}
      >
        <div className={styles.totalAmountWrapper}>
          <p className={styles.totalAmountTitle}>{t("totalAmountOnAccounts")}</p>
          <p className={styles.totalAmount}>{setFormattedAmount(accountsTotalSum)}</p>
          <span className={styles.divider} />
        </div>
        <div className={styles.accountsWrapper}>
          <h2 className={styles.title} onClick={() => setSelectedAccounts([])}>
            {t("myAccounts")}
          </h2>
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setCreateAccountModalOpen(true)}
          >
            <GoPlus />
          </button>
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setDeleteAccountModalOpen(true)}
          >
            <BiEditAlt />
          </button>
        </div>
        <div className={styles.accountListWrapper}>
          <ul className={styles.accountList}>
            <AnimatePresence>
              {accounts.map((account) => (
                <motion.li
                  key={account.id}
                  className={`${styles.accountItem} ${
                    isAccountSelected(account) ? styles.selected : ""
                  }`}
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
          <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
            {selectedAccounts.length > 0 && (
              <motion.div
                variants={ACCOUNT_VARIANTS}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <span className={styles.divider} />
                <div className={styles.selectedAccounts}>
                  <p>
                    <Trans i18nKey="selectedAccountsTotalSum" count={count} name={name}>
                      Total for {{ count }} {{ name }}
                    </Trans>
                  </p>
                  <span className={styles.selectedAccountsTotalSum}>
                    {setFormattedAmount(selectedAccountsTotalSum)}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {createAccountModalOpen && (
          <CreateAccountModal setOpen={setCreateAccountModalOpen} />
        )}
        {deleteAccountModalOpen && (
          <DeleteAccountModal setOpen={setDeleteAccountModalOpen} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
