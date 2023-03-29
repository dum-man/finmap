import { useTranslation } from "react-i18next";
import { CloseButton, Modal } from "../../../../ui";
import CreateExpenseForm from "../CreateExpenseForm/CreateExpenseForm";
import styles from "./CreateExpense.module.scss";

interface CreateExpenseProps {
  setOpen: (open: React.SetStateAction<boolean>) => void;
}

const CreateExpense: React.FC<CreateExpenseProps> = ({ setOpen }) => {
  const { t } = useTranslation();

  return (
    <Modal onClose={() => setOpen(false)}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("newExpense")}</h2>
        <CloseButton onClick={() => setOpen(false)} />
        <CreateExpenseForm onClose={() => setOpen(false)} />
      </div>
    </Modal>
  );
};

export default CreateExpense;
