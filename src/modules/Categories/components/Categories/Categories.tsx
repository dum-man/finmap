import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";
import { CloseButton, Modal } from "../../../../ui";
import CreateCategoryForm from "../CreateCategoryForm/CreateCategoryForm";
import AddCategoryButton from "../AddCategoryButton/AddCategoryButton";
import TransactionCategories from "../TransactionCategories/TransactionCategories";
import Skeleton from "../Skeleton/Skeleton";
import { useGetCategoriesQuery } from "../../../../app/services/categoryApi";
import { auth } from "../../../../firebase";
import { Category } from "../../../../types";
import styles from "./Categories.module.scss";

interface CategoriesProps {
  type: "income" | "expense";
  onClose: () => void;
}

const Categories: React.FC<CategoriesProps> = ({ type, onClose }) => {
  const { t } = useTranslation();

  const [currentUser] = useAuthState(auth);

  const { data: categories = [], isLoading } = useGetCategoriesQuery(
    currentUser?.uid as string
  );

  const [formVisible, setFormVisible] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const onSelectCategory = (category: Category) => {
    setCategoryName(category.label);
    setEditingCategory(category);
    setFormVisible(true);
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t(`${type}Categories`)}</h2>
        <CloseButton onClick={onClose} />
        <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
          {formVisible ? (
            <CreateCategoryForm
              type={type}
              categoryName={categoryName}
              setCategoryName={setCategoryName}
              editingCategory={editingCategory}
              setEditingCategory={setEditingCategory}
              setFormVisible={setFormVisible}
            />
          ) : (
            <AddCategoryButton setFormVisible={setFormVisible} />
          )}
        </AnimatePresence>
        {isLoading ? (
          <Skeleton />
        ) : (
          <TransactionCategories
            type={type}
            transactionCategories={categories}
            onSelectCategory={onSelectCategory}
          />
        )}
      </div>
    </Modal>
  );
};

export default Categories;
