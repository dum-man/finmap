import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Modal } from "layouts";
import { CloseButton } from "ui";
import { toggleCreateExpenseOpen } from "app/slices/appSlice";
import CreateExpenseForm from "../CreateExpenseForm/CreateExpenseForm";
import styles from "./CreateExpense.module.scss";

const CreateExpense: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleCreateExpenseOpen(false));
  };

  return (
    <Modal onClose={handleClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("newExpense")}</h2>
        <CloseButton onClick={handleClose} />
        <CreateExpenseForm onClose={handleClose} />
      </div>
    </Modal>
  );
};

export default CreateExpense;
