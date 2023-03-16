import { useRecoilValue } from "recoil";
import { useTranslation } from "react-i18next";
import { AiOutlineMenu } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import { accountsState } from "../../../app/atoms/accountsAtom";
import CloseButton from "../../UI/CloseButton/CloseButton";
import Modal from "../../UI/Modal/Modal";
import styles from "./Modal.module.scss";

interface AccountsProps {
  setOpen: (open: boolean) => void;
  setCreateAccountModalOpen: (open: boolean) => void;
}

const Accounts: React.FC<AccountsProps> = ({ setOpen, setCreateAccountModalOpen }) => {
  const { t } = useTranslation();

  const { accounts } = useRecoilValue(accountsState);

  const onAddAccountClick = () => {
    setOpen(false);
    setCreateAccountModalOpen(true);
  };

  return (
    <Modal onClose={() => setOpen(false)}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("accounts")}</h2>
        <CloseButton onClose={() => setOpen(false)} />
        <button className={styles.button} onClick={onAddAccountClick}>
          {t("addAccount")}
        </button>
        <ul className={styles.accountList}>
          {accounts.map((account) => (
            <li key={account.id} className={styles.accountItem}>
              <div className={styles.accountItemWrapper}>
                <AiOutlineMenu className={styles.icon} />
                <BsCurrencyDollar className={styles.icon} />
                {account.group === "base" ? t(account.name) : account.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default Accounts;
