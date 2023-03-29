import { useTranslation } from "react-i18next";
import { BiEditAlt } from "react-icons/bi";
import { GoPlus } from "react-icons/go";
import styles from "./AccountButtons.module.scss";

interface AccountButtonsProps {
  setCreateAccountOpen: (open: React.SetStateAction<boolean>) => void;
  setDeleteAccountOpen: (open: React.SetStateAction<boolean>) => void;
}

const AccountButtons: React.FC<AccountButtonsProps> = ({
  setCreateAccountOpen,
  setDeleteAccountOpen,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{t("myAccounts")}</h2>
      <button
        type="button"
        className={styles.iconButton}
        onClick={() => setCreateAccountOpen(true)}
      >
        <GoPlus />
      </button>
      <button
        type="button"
        className={styles.iconButton}
        onClick={() => setDeleteAccountOpen(true)}
      >
        <BiEditAlt />
      </button>
    </div>
  );
};

export default AccountButtons;
