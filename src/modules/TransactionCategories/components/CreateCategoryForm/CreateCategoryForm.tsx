import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { uuidv4 } from "@firebase/util";
import { Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { BsCheckLg } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { TextInput } from "../../../../components";
import { categoriesState } from "../../../../app/atoms/categoriesAtom";
import { createCategory } from "../../../../app/api";
import { deleteCategory } from "../../api";
import { VARIANTS } from "../../constants";
import { auth } from "../../../../firebase";
import { Category } from "../../../../types";
import styles from "./CreateCategoryForm.module.scss";

interface CreateCategoryFormProps {
  type: "income" | "expense";
  categoryName: string;
  setCategoryName: (name: React.SetStateAction<string>) => void;
  editingCategory: Category | null;
  setEditingCategory: (category: React.SetStateAction<Category | null>) => void;
  setFormVisible: (visible: React.SetStateAction<boolean>) => void;
}

const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({
  type,
  categoryName,
  setCategoryName,
  editingCategory,
  setEditingCategory,
  setFormVisible,
}) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const setCategoriesStateValue = useSetRecoilState(categoriesState);

  const [loading, setLoading] = useState(false);

  const onCategoryNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value.length > 20) {
      return;
    }
    setCategoryName(evt.target.value);
  };

  const handleCreateOrEditCategory = async (evt: React.FormEvent) => {
    evt.preventDefault();

    const formattedCategoryName = categoryName.trim();

    if (!formattedCategoryName) {
      toast.error(t("categoryNameError"));
      return;
    }
    let category: Category;

    if (editingCategory) {
      category = {
        ...editingCategory,
        label: formattedCategoryName,
      };
    } else {
      category = {
        id: uuidv4(),
        group: "user",
        type,
        label: formattedCategoryName,
        createdAt: Timestamp.now(),
      };
    }
    setLoading(true);
    try {
      await createCategory(currentUser?.uid, category);
      if (editingCategory) {
        setCategoriesStateValue((prev) => {
          const updatedCategories = [...prev.categories[category.type]];
          const updatedCategoryIndex = updatedCategories.findIndex(
            (item) => item.id === category.id
          );
          const updatedCategory = updatedCategories[updatedCategoryIndex];
          updatedCategories[updatedCategoryIndex] = {
            ...updatedCategory,
            label: category.label,
          };
          return {
            ...prev,
            categories: {
              ...prev.categories,
              [category.type]: updatedCategories,
            },
          };
        });
      } else {
        setCategoriesStateValue((prev) => ({
          ...prev,
          categories: {
            ...prev.categories,
            [type]: [...prev.categories[type], category],
          },
        }));
      }
      onCloseForm();
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    setLoading(false);
  };

  const handleDeleteCategory = async () => {
    if (!editingCategory) {
      toast.error(t("categorySelectedError"));
      return;
    }
    setLoading(true);
    try {
      await deleteCategory(currentUser?.uid, editingCategory.id);
      setCategoriesStateValue((prev) => ({
        ...prev,
        categories: {
          ...prev.categories,
          [editingCategory.type]: [
            ...prev.categories[editingCategory.type].filter(
              (category) => category.id !== editingCategory.id
            ),
          ],
        },
      }));
      onCloseForm();
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    setLoading(false);
  };

  const onCloseForm = () => {
    setFormVisible(false);
    setEditingCategory(null);
    setCategoryName("");
  };

  return (
    <motion.form
      className={styles.wrapper}
      variants={VARIANTS}
      initial="hidden"
      animate="visible"
      onSubmit={handleCreateOrEditCategory}
    >
      <TextInput
        id="categoryName"
        placeholder={t("categoryName")}
        maxLength={20}
        value={categoryName}
        onChange={onCategoryNameChange}
      />
      <div className={styles.buttons}>
        <button className={styles.iconButton} type="submit" disabled={loading}>
          <BsCheckLg className={styles.submitIcon} />
        </button>
        <button
          className={styles.iconButton}
          type="button"
          disabled={loading}
          onClick={onCloseForm}
        >
          <IoClose />
        </button>
        {editingCategory && (
          <button
            className={styles.iconButton}
            type="button"
            disabled={loading}
            onClick={handleDeleteCategory}
          >
            <RiDeleteBinLine className={styles.deleteIcon} />
          </button>
        )}
      </div>
    </motion.form>
  );
};

export default CreateCategoryForm;
