import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Modal } from "layouts";
import { CloseButton } from "ui";
import { toggleResetPasswordOpen } from "app/slices/appSlice";
import ResetPasswordWrapper from "../ResetPasswordWrapper/ResetPasswordWrapper";
import styles from "./ResetPassword.module.scss";

const ResetPassword: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleResetPasswordOpen(false));
  };

  return (
    <Modal onClose={handleClose}>
      <div className={styles.container}>
        <CloseButton onClick={handleClose} />
        <h2 className={styles.title}>{t("resetPassword")}</h2>
        <ResetPasswordWrapper />
      </div>
    </Modal>
  );
};

export default ResetPassword;
