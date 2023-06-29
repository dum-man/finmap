import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { BiEditAlt } from "react-icons/bi";
import { GoPlus } from "react-icons/go";
import { toggleCreateAccountOpen, toggleDeleteAccountOpen } from "app/slices/appSlice";
import styles from "./AccountButtons.module.scss";

const AccountButtons: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{t("myAccounts")}</h2>
      <button
        type="button"
        className={styles.iconButton}
        onClick={() => dispatch(toggleCreateAccountOpen())}
      >
        <GoPlus />
      </button>
      <button
        type="button"
        className={styles.iconButton}
        onClick={() => dispatch(toggleDeleteAccountOpen())}
      >
        <BiEditAlt />
      </button>
    </div>
  );
};

export default AccountButtons;
