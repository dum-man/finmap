import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { CloseButton, Modal } from "../../../../ui";
import ResetPasswordForm from "../ResetPasswordForm/ResetPasswordForm";
import ResetSuccess from "../ResetSuccess/ResetSuccess";
import styles from "./ResetPassword.module.scss";

interface ResetPasswordProps {
  setOpen: (open: React.SetStateAction<boolean>) => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ setOpen }) => {
  const { t } = useTranslation();

  const [success, setSuccess] = useState(false);

  return (
    <Modal onClose={() => setOpen(false)}>
      <div className={styles.container}>
        <CloseButton onClick={() => setOpen(false)} />
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