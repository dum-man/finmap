import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { CloseButton, Modal } from "../../../../ui";
import AccountItem from "../AccountItem/AccountItem";
import { accountsState } from "../../../../app/atoms/accountsAtom";
import styles from "./Accounts.module.scss";

interface AccountsProps {
  setOpen: (open: React.SetStateAction<boolean>) => void;
}

const Accounts: React.FC<AccountsProps> = ({ setOpen }) => {
  const { t } = useTranslation();

  const { accounts } = useRecoilValue(accountsState);

  return (
    <Modal onClose={() => setOpen(false)}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("accounts")}</h2>
        <CloseButton onClick={() => setOpen(false)} />
        <ul className={styles.accountList}>
          {accounts.map((account) => (
            <AccountItem key={account.id} account={account} />
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default Accounts;
