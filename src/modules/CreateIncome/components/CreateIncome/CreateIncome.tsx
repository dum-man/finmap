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

  const handleClose = () => {
    dispatch(toggleCreateIncomeOpen(false));
  };

  return (
    <Modal onClose={handleClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("newIncome")}</h2>
        <CloseButton onClick={handleClose} />
        <CreateIncomeForm onClose={handleClose} />
      </div>
    </Modal>
  );
};

export default CreateIncome;
