import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";
import { Modal } from "layouts";
import { CloseButton } from "ui";
import { toggleAccountsOpen } from "app/slices/appSlice";
import Container from "../Container/Container";
import AccountsList from "../AccountsList/AccountsList";
import { RootState } from "app/store";
import styles from "./Accounts.module.scss";

const Accounts: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const accountsOpen = useSelector((state: RootState) => state.app.accountsOpen);

  const handleClose = () => {
    dispatch(toggleAccountsOpen(false));
  };

  return (
    <AnimatePresence>
      {accountsOpen && (
        <Modal onClose={handleClose}>
          <div className={styles.container}>
            <h2 className={styles.title}>{t("accounts")}</h2>
            <CloseButton onClick={handleClose} />
            <Container />
            <AccountsList />
          </div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default Accounts;
