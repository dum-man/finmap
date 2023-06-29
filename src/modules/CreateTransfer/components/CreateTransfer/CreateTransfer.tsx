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

  const handleToggle = () => {
    dispatch(toggleCreateTransferOpen());
  };

  return (
    <Modal onClose={handleToggle}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("newTransfer")}</h2>
        <CloseButton onClick={handleToggle} />
        <CreateTransferForm onClose={handleToggle} />
      </div>
    </Modal>
  );
};

export default CreateTransfer;
