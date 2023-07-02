import { useState } from "react";
import { useDispatch } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import { Modal } from "layouts";
import { CloseButton } from "ui";
import { toggleResetPasswordOpen } from "app/slices/appSlice";
import ResetPasswordForm from "../ResetPasswordForm/ResetPasswordForm";
import ResetSuccess from "../ResetSuccess/ResetSuccess";
import styles from "./ResetPassword.module.scss";

const ResetPassword: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleResetPasswordOpen(false));
  };

  const [success, setSuccess] = useState(false);

  return (
    <Modal onClose={handleClose}>
      <div className={styles.container}>
        <CloseButton onClick={handleClose} />
        {success ? (
          <ResetSuccess />
        ) : (
          <>
            <h2 className={styles.title}>{t("resetPassword")}</h2>
            <p className={styles.prompt}>
              <Trans i18nKey="emailForReset"></Trans>
            </p>
            <ResetPasswordForm setSuccess={setSuccess} />
          </>
        )}
      </div>
    </Modal>
  );
};

export default ResetPassword;
