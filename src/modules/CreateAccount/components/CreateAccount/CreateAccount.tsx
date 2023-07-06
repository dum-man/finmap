import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";
import { Modal } from "layouts";
import { CloseButton } from "ui";
import { toggleCreateAccountOpen } from "app/slices/appSlice";
import CreateAccountForm from "../CreateAccountForm/CreateAccountForm";
import { RootState } from "app/store";
import styles from "./CreateAccount.module.scss";

const CreateAccount: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const createAccountOpen = useSelector(
    (state: RootState) => state.app.createAccountOpen
  );

  const handleClose = () => {
    dispatch(toggleCreateAccountOpen(false));
  };

  return (
    <AnimatePresence>
      {createAccountOpen && (
        <Modal onClose={handleClose}>
          <div className={styles.container}>
            <h2 className={styles.title}>{t("addAccount")}</h2>
            <CloseButton onClick={handleClose} />
            <CreateAccountForm onClose={handleClose} />
          </div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default CreateAccount;
