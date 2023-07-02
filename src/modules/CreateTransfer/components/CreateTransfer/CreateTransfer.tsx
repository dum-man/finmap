import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Modal } from "layouts";
import { CloseButton } from "ui";
import { toggleCreateTransferOpen } from "app/slices/appSlice";
import CreateTransferForm from "../CreateTransferForm/CreateTransferForm";
import styles from "./CreateTransfer.module.scss";

const CreateTransfer: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleCreateTransferOpen(false));
  };

  return (
    <Modal onClose={handleClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("newTransfer")}</h2>
        <CloseButton onClick={handleClose} />
        <CreateTransferForm onClose={handleClose} />
      </div>
    </Modal>
  );
};

export default CreateTransfer;
