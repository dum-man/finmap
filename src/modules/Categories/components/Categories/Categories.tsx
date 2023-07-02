import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Modal } from "layouts";
import { CloseButton } from "ui";
import { toggleCategoriesOpen } from "app/slices/appSlice";
import { RootState } from "app/store";
import Container from "../Container/Container";
import styles from "./Categories.module.scss";

const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { categoryType } = useSelector((state: RootState) => state.app);

  const handleClose = () => {
    dispatch(toggleCategoriesOpen(false));
  };

  return (
    <Modal onClose={handleClose}>
      <div className={styles.container}>
        <CloseButton onClick={handleClose} />
        <h2 className={styles.title}>{t(`${categoryType}Categories`)}</h2>
        <Container />
      </div>
    </Modal>
  );
};

export default Categories;
