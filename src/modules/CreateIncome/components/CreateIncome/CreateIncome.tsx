import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";
import { Modal } from "layouts";
import { CloseButton } from "ui";
import { toggleCreateIncomeOpen } from "app/slices/appSlice";
import CreateIncomeForm from "../CreateIncomeForm/CreateIncomeForm";
import { RootState } from "app/store";
import styles from "./CreateIncome.module.scss";

const CreateIncome: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const createIncomeOpen = useSelector((state: RootState) => state.app.createIncomeOpen);

  const handleClose = () => {
    dispatch(toggleCreateIncomeOpen(false));
  };

  return (
    <AnimatePresence>
      {createIncomeOpen && (
        <Modal onClose={handleClose}>
          <div className={styles.container}>
            <h2 className={styles.title}>{t("newIncome")}</h2>
            <CloseButton onClick={handleClose} />
            <CreateIncomeForm onClose={handleClose} />
          </div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default CreateIncome;
