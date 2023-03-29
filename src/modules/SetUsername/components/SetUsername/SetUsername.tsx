import { useTranslation } from "react-i18next";
import { CloseButton, Modal } from "../../../../ui";
import SetUsernameForm from "../SetUsernameForm/SetUsernameForm";
import styles from "./SetUsername.module.scss";

interface SetUsernameProps {
  setOpen: (open: React.SetStateAction<boolean>) => void;
}

const SetUsername: React.FC<SetUsernameProps> = ({ setOpen }) => {
  const { t } = useTranslation();

  return (
    <Modal onClose={() => setOpen(false)}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("username")}</h2>
        <CloseButton onClick={() => setOpen(false)} />
        <SetUsernameForm onClose={() => setOpen(false)} />
      </div>
    </Modal>
  );
};

export default SetUsername;
