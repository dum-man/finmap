import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { Modal } from "layouts";
import { CloseButton } from "ui";
import { toggleCategoriesOpen } from "app/slices/appSlice";
import { RootState } from "app/store";
import Container from "../Container/Container";
import styles from "./Categories.module.scss";

const Categories: React.FC = () => {
  const dispatch = useDispatch();

  const categoriesOpen = useSelector((state: RootState) => state.app.categoriesOpen);

  const handleClose = () => {
    dispatch(toggleCategoriesOpen(false));
  };

  return (
    <AnimatePresence>
      {categoriesOpen && (
        <Modal onClose={handleClose}>
          <div className={styles.container}>
            <CloseButton onClick={handleClose} />

            <Container />
          </div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default Categories;
