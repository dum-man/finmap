import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Modal } from "layouts";
import { CloseButton } from "ui";
import { toggleCreateIncomeOpen } from "app/slices/appSlice";
import CreateIncomeForm from "../CreateIncomeForm/CreateIncomeForm";
import styles from "./CreateIncome.module.scss";

const CreateIncome: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleCreateIncomeOpen());
  };

  return (
    <Modal onClose={handleToggle}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("newIncome")}</h2>
        <CloseButton onClick={handleToggle} />
        <CreateIncomeForm onClose={handleToggle} />
      </div>
    </Modal>
  );
};

export default CreateIncome;
