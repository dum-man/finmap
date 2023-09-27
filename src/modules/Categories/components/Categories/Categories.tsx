import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import { toggleCategoriesOpen } from "app/slices/appSlice";
import { MainPopup } from "components";
import AddButton from "../AddButton/AddButton";
import CategoriesList from "../CategoriesList/CategoriesList";
import CreateCategoryForm from "../CreateCategoryForm/CreateCategoryForm";
import { Category } from "types";
import styles from "./Categories.module.css";

const Categories: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const categoriesOpen = useAppSelector((state) => state.app.categoriesOpen);

  const categoryType = useAppSelector((state) => state.app.categoryType);

  const [formVisible, setFormVisible] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleSelectCategory = useCallback((category: Category) => {
    setCategoryName(category.label);
    setEditingCategory(category);
    setFormVisible(true);
  }, []);

  const handleClose = () => {
    dispatch(toggleCategoriesOpen(false));
  };

  return (
    <MainPopup
      title={t(`${categoryType}Categories`)}
      isOpen={categoriesOpen}
      onClose={handleClose}
    >
      <div className={styles["container"]}>
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
        <CategoriesList onSelectCategory={handleSelectCategory} />
      </div>
    </MainPopup>
  );
};

export default Categories;
