import { useTranslation } from "react-i18next";
import { CloseButton, Modal } from "../../../../ui";
import CreateTransferForm from "../CreateTransferForm/CreateTransferForm";
import styles from "./CreateTransfer.module.scss";

interface CreateTransferProps {
  onClose: () => void;
}

const CreateTransfer: React.FC<CreateTransferProps> = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("newTransfer")}</h2>
        <CloseButton onClick={onClose} />
        <CreateTransferForm onClose={onClose} />
      </div>
    </Modal>
  );
};

export default CreateTransfer;
