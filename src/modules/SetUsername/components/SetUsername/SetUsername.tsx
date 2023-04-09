import { useTranslation } from "react-i18next";
import { CloseButton, Modal } from "../../../../ui";
import SetUsernameForm from "../SetUsernameForm/SetUsernameForm";
import styles from "./SetUsername.module.scss";

interface SetUsernameProps {
  onClose: () => void;
}

const SetUsername: React.FC<SetUsernameProps> = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("username")}</h2>
        <CloseButton onClick={onClose} />
        <SetUsernameForm onClose={onClose} />
      </div>
    </Modal>
  );
};

export default SetUsername;
