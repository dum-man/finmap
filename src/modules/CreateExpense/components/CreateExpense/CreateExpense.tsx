import { useTranslation } from "react-i18next";
import { CloseButton, Modal } from "../../../../ui";
import CreateExpenseForm from "../CreateExpenseForm/CreateExpenseForm";
import styles from "./CreateExpense.module.scss";

interface CreateExpenseProps {
  onClose: () => void;
}

const CreateExpense: React.FC<CreateExpenseProps> = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("newExpense")}</h2>
        <CloseButton onClick={onClose} />
        <CreateExpenseForm onClose={onClose} />
      </div>
    </Modal>
  );
};

export default CreateExpense;
