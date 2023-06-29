import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Modal } from "layouts";
import { CloseButton } from "ui";
import { toggleChangePasswordOpen } from "app/slices/appSlice";
import ChangePasswordForm from "../ChangePasswordForm/ChangePasswordForm";
import Success from "../ChangeSuccess/ChangeSuccess";
import styles from "./ChangePassword.module.scss";

const ChangePassword: React.FC = () => {
  const { t } = useTranslation();

  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleChangePasswordOpen());
  };

  return (
    <Modal onClose={handleToggle}>
      <div className={styles.container}>
        <CloseButton onClick={handleToggle} />
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
