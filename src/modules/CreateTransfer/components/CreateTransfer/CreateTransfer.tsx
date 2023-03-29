import { useTranslation } from "react-i18next";
import { CloseButton, Modal } from "../../../../ui";
import CreateTransferForm from "../CreateTransferForm/CreateTransferForm";
import styles from "./CreateTransfer.module.scss";

interface CreateTransferProps {
  setOpen: (open: React.SetStateAction<boolean>) => void;
}

const CreateTransfer: React.FC<CreateTransferProps> = ({ setOpen }) => {
  const { t } = useTranslation();

  return (
    <Modal onClose={() => setOpen(false)}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("newTransfer")}</h2>
        <CloseButton onClick={() => setOpen(false)} />
        <CreateTransferForm onClose={() => setOpen(false)} />
      </div>
    </Modal>
  );
};

export default CreateTransfer;
