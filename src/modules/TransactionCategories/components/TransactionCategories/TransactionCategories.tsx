import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";
import { CloseButton, Modal } from "../../../../ui";
import CreateCategoryForm from "../CreateCategoryForm/CreateCategoryForm";
import AddCategoryButton from "../AddCategoryButton/AddCategoryButton";
import Categories from "../Categories/Categories";
import { Category } from "../../../../types";
import styles from "./TransactionCategories.module.scss";

interface TransactionCategoriesProps {
  type: "income" | "expense";
  setOpen: (open: React.SetStateAction<boolean>) => void;
}

const TransactionCategories: React.FC<TransactionCategoriesProps> = ({
  type,
  setOpen,
}) => {
  const { t } = useTranslation();

  const [formVisible, setFormVisible] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const onSelectCategory = (category: Category) => {
    setCategoryName(category.label);
    setEditingCategory(category);
    setFormVisible(true);
  };

  return (
    <Modal onClose={() => setOpen(false)}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t(`${type}Categories`)}</h2>
        <CloseButton onClick={() => setOpen(false)} />
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
        <Categories type={type} onSelectCategory={onSelectCategory} />
      </div>
    </Modal>
  );
};

export default TransactionCategories;
