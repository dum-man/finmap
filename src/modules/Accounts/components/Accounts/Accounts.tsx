import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Modal } from "../../../../layouts";
import { CloseButton } from "../../../../ui";
import { toggleAccountsOpen } from "../../../../app/slices/appSlice";
import AccountsList from "../AccountsList/AccountsList";
import Container from "../Container/Container";
import styles from "./Accounts.module.scss";

const Accounts: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleAccountsOpen());
  };

  return (
    <Modal onClose={handleToggle}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("accounts")}</h2>
        <CloseButton onClick={handleToggle} />
        <Container />
        <AccountsList />
      </div>
    </Modal>
  );
};

export default Accounts;
