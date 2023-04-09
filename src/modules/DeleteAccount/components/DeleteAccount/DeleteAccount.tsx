import { useTranslation } from "react-i18next";
import { CloseButton, Modal } from "../../../../ui";
import DeleteAccountForm from "../DeleteAccountForm/DeleteAccountForm";
import styles from "./DeleteAccount.module.scss";

interface DeleteAccountProps {
  onClose: () => void;
}

const DeleteAccount: React.FC<DeleteAccountProps> = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("deleteAccount")}</h2>
        <CloseButton onClick={onClose} />
        <DeleteAccountForm onClose={onClose} />
      </div>
    </Modal>
  );
};

export default DeleteAccount;
