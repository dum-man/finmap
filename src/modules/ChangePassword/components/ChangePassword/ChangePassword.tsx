import { useState } from "react";
import { useTranslation } from "react-i18next";
import ChangePasswordForm from "../ChangePasswordForm/ChangePasswordForm";
import Success from "../ChangeSuccess/ChangeSuccess";
import { CloseButton, Modal } from "../../../../ui";
import styles from "./ChangePassword.module.scss";

interface ChangePasswordProps {
  onClose: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ onClose }) => {
  const { t } = useTranslation();

  const [success, setSuccess] = useState(false);

  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <CloseButton onClick={onClose} />
        {success ? (
          <Success />
        ) : (
          <>
            <h2 className={styles.title}>{t("changePassword")}</h2>
            <ChangePasswordForm setSuccess={setSuccess} />
          </>
        )}
      </div>
    </Modal>
  );
};

export default ChangePassword;
