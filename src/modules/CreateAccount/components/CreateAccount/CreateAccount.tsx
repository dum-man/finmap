import { useTranslation } from "react-i18next";
import { CloseButton, Modal } from "../../../../ui";
import CreateAccountForm from "../CreateAccountForm/CreateAccountForm";
import styles from "./CreateAccount.module.scss";

interface CreateAccountProps {
  onClose: () => void;
}

const CreateAccount: React.FC<CreateAccountProps> = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("addAccount")}</h2>
        <CloseButton onClick={onClose} />
        <CreateAccountForm onClose={onClose} />
      </div>
    </Modal>
  );
};

export default CreateAccount;
