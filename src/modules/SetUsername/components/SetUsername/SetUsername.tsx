import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Modal } from "../../../../layouts";
import { CloseButton } from "../../../../ui";
import { toggleSetUsernameOpen } from "../../../../app/slices/appSlice";
import SetUsernameForm from "../SetUsernameForm/SetUsernameForm";
import styles from "./SetUsername.module.scss";

const SetUsername: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleSetUsernameOpen());
  };

  return (
    <Modal onClose={handleClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("username")}</h2>
        <CloseButton onClick={handleClose} />
        <SetUsernameForm onClose={handleClose} />
      </div>
    </Modal>
  );
};

export default SetUsername;
