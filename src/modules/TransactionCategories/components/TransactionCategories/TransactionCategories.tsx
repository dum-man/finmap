import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Modal } from "layouts";
import { CloseButton } from "ui";
import { toggleTransactionCategoriesOpen } from "app/slices/appSlice";
import { RootState } from "app/store";
import Container from "../Container/Container";
import styles from "./TransactionCategories.module.scss";

const TransactionCategories: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { categoryType } = useSelector((state: RootState) => state.app);

  const handleToggle = () => {
    dispatch(toggleTransactionCategoriesOpen());
  };

  return (
    <Modal onClose={handleToggle}>
      <div className={styles.container}>
        <CloseButton onClick={handleToggle} />
        <h2 className={styles.title}>{t(`${categoryType}Categories`)}</h2>
        <Container />
      </div>
    </Modal>
  );
};

export default TransactionCategories;
