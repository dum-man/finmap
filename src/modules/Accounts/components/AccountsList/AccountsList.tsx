import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AnimatePresence } from "framer-motion";
import AccountItem from "../AccountItem/AccountItem";
import { auth } from "app/config";
import { useGetAccountsQuery } from "app/services/accountApi";
import NotFound from "../NotFound/NotFound";
import { Account } from "types";
import styles from "./AccountsList.module.scss";

const AccountsList: React.FC = React.memo(() => {
  const [currentUser] = useAuthState(auth);

  const { data: accounts = [] } = useGetAccountsQuery({ userId: currentUser?.uid! });

  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);

  if (!accounts.length) {
    return <NotFound />;
  }

  return (
    <ul className={styles.accountsList}>
      <AnimatePresence initial={false}>
        {accounts.map((account) => (
          <AccountItem
            key={account.id}
            account={account}
            accountToDeleteId={accountToDelete?.id}
            setAccountToDelete={setAccountToDelete}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
});

export default AccountsList;
