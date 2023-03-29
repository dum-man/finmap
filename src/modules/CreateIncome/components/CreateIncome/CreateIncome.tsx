import { useTranslation } from "react-i18next";
import { CloseButton, Modal } from "../../../../ui";
import CreateIncomeForm from "../CreateIncomeForm/CreateIncomeForm";
import styles from "./CreateIncome.module.scss";

interface CreateIncomeProps {
  setOpen: (open: React.SetStateAction<boolean>) => void;
}

const CreateIncome: React.FC<CreateIncomeProps> = ({ setOpen }) => {
  const { t } = useTranslation();

  return (
    <Modal onClose={() => setOpen(false)}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("newIncome")}</h2>
        <CloseButton onClick={() => setOpen(false)} />
        <CreateIncomeForm onClose={() => setOpen(false)} />
      </div>
    </Modal>
  );
};

export default CreateIncome;
