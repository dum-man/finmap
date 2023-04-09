import { useTranslation } from "react-i18next";
import { CloseButton, Modal } from "../../../../ui";
import CreateIncomeForm from "../CreateIncomeForm/CreateIncomeForm";
import styles from "./CreateIncome.module.scss";

interface CreateIncomeProps {
  onClose: () => void;
}

const CreateIncome: React.FC<CreateIncomeProps> = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("newIncome")}</h2>
        <CloseButton onClick={onClose} />
        <CreateIncomeForm onClose={onClose} />
      </div>
    </Modal>
  );
};

export default CreateIncome;
