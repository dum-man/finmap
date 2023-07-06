import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";
import { Modal } from "layouts";
import { CloseButton } from "ui";
import { toggleDeleteAccountOpen } from "app/slices/appSlice";
import DeleteAccountForm from "../DeleteAccountForm/DeleteAccountForm";
import { RootState } from "app/store";
import styles from "./DeleteAccount.module.scss";

const DeleteAccount: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const deleteAccountOpen = useSelector(
    (state: RootState) => state.app.deleteAccountOpen
  );

  const handleClose = () => {
    dispatch(toggleDeleteAccountOpen(false));
  };

  return (
    <AnimatePresence>
      {deleteAccountOpen && (
        <Modal onClose={handleClose}>
          <div className={styles.container}>
            <h2 className={styles.title}>{t("deleteAccount")}</h2>
            <CloseButton onClick={handleClose} />
            <DeleteAccountForm onClose={handleClose} />
          </div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default DeleteAccount;
