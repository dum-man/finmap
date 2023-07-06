import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";
import { Modal } from "layouts";
import { CloseButton } from "ui";
import ChangePasswordWrapper from "../ChangePasswordWrapper/ChangePasswordWrapper";
import { toggleChangePasswordOpen } from "app/slices/appSlice";
import { RootState } from "app/store";
import styles from "./ChangePassword.module.scss";

const ChangePassword: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const changePasswordOpen = useSelector(
    (state: RootState) => state.app.changePasswordOpen
  );

  const handleClose = () => {
    dispatch(toggleChangePasswordOpen(false));
  };

  return (
    <AnimatePresence>
      {changePasswordOpen && (
        <Modal onClose={handleClose}>
          <div className={styles.container}>
            <CloseButton onClick={handleClose} />
            <h2 className={styles.title}>{t("changePassword")}</h2>
            <ChangePasswordWrapper />
          </div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default ChangePassword;
