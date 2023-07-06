import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";
import { Modal } from "layouts";
import { CloseButton } from "ui";
import { toggleCreateTransferOpen } from "app/slices/appSlice";
import CreateTransferForm from "../CreateTransferForm/CreateTransferForm";
import { RootState } from "app/store";
import styles from "./CreateTransfer.module.scss";

const CreateTransfer: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const createTransferOpen = useSelector(
    (state: RootState) => state.app.createTransferOpen
  );

  const handleClose = () => {
    dispatch(toggleCreateTransferOpen(false));
  };

  return (
    <AnimatePresence>
      {createTransferOpen && (
        <Modal onClose={handleClose}>
          <div className={styles.container}>
            <h2 className={styles.title}>{t("newTransfer")}</h2>
            <CloseButton onClick={handleClose} />
            <CreateTransferForm onClose={handleClose} />
          </div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default CreateTransfer;
