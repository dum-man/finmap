import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuthState } from "react-firebase-hooks/auth";
import { CloseButton, Modal } from "../../../../ui";
import AddButton from "../AddButton/AddButton";
import CreateAccountForm from "../CreateAccountForm/CreateAccountForm";
import AccountItem from "../AccountItem/AccountItem";
import { useGetAccountsQuery } from "../../../../app/services/accountApi";
import { auth } from "../../../../firebase";
import styles from "./Accounts.module.scss";

interface AccountsProps {
  onClose: () => void;
}

const Accounts: React.FC<AccountsProps> = ({ onClose }) => {
  const { t } = useTranslation();

  const [currentUser] = useAuthState(auth);

  const { data: accounts = [] } = useGetAccountsQuery(currentUser?.uid as string);

  const [formVisible, setFormVisible] = useState(false);

  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("accounts")}</h2>
        <CloseButton onClick={onClose} />
        {formVisible ? (
          <CreateAccountForm onClose={() => setFormVisible(false)} />
        ) : (
          <AddButton onFormOpen={() => setFormVisible(true)} />
        )}
        <ul className={styles.accounts}>
          {accounts.map((account) => (
            <AccountItem key={account.id} account={account} />
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default Accounts;
