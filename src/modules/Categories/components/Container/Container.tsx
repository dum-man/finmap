import { useCallback, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AnimatePresence } from "framer-motion";
import AddButton from "../AddButton/AddButton";
import CategoriesList from "../CategoriesList/CategoriesList";
import CreateCategoryForm from "../CreateCategoryForm/CreateCategoryForm";
import Skeleton from "../Skeleton/Skeleton";
import { useGetCategoriesQuery } from "app/services/categoryApi";
import { auth } from "app/config";
import { Category } from "types";

const Container: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const { data: categories = [], isLoading } = useGetCategoriesQuery(
    currentUser?.uid as string
  );
  const [formVisible, setFormVisible] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleSelectCategory = useCallback((category: Category) => {
    setCategoryName(category.label);
    setEditingCategory(category);
    setFormVisible(true);
  }, []);

  return (
    <>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {formVisible ? (
          <CreateCategoryForm
            categoryName={categoryName}
            setCategoryName={setCategoryName}
            editingCategory={editingCategory}
            setEditingCategory={setEditingCategory}
            setFormVisible={setFormVisible}
          />
        ) : (
          <AddButton setFormVisible={setFormVisible} />
        )}
      </AnimatePresence>
      {!isLoading ? (
        <CategoriesList
          transactionCategories={categories}
          onSelectCategory={handleSelectCategory}
        />
      ) : (
        <Skeleton />
      )}
    </>
  );
};

export default Container;
