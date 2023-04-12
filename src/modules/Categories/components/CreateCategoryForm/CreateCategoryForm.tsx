import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { uuidv4 } from "@firebase/util";
import { Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { BsCheckLg } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { TextInput } from "../../../../components";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useLazyCheckCategoryExistsQuery,
} from "../../../../app/services/categoryApi";
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

  const [checkCategoryExists] = useLazyCheckCategoryExistsQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

  const [categoryCreating, setCategoryCreating] = useState(false);

  const onCategoryNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(evt.target.value);
  };

  const handleCreateOrEditCategory = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!currentUser) {
      return;
    }

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
    setCategoryCreating(true);
    try {
      const categoryExists = await checkCategoryExists({
        userId: currentUser.uid,
        label: category.label,
      }).unwrap();
      if (categoryExists) {
        throw new Error(`You already have "${category.label}" category`);
      }
      await createCategory({ userId: currentUser.uid, category }).unwrap();
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    setCategoryCreating(false);
    onCloseForm();
  };

  const handleDeleteCategory = async () => {
    if (!currentUser) {
      return;
    }

    if (!editingCategory) {
      toast.error(t("categorySelectedError"));
      return;
    }
    try {
      await deleteCategory({
        userId: currentUser.uid,
        categoryId: editingCategory.id,
      }).unwrap();
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    onCloseForm();
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
        <button className={styles.iconButton} type="submit" disabled={categoryCreating}>
          <BsCheckLg className={styles.submitIcon} />
        </button>
        <button
          className={styles.iconButton}
          type="button"
          disabled={categoryCreating || isDeleting}
          onClick={onCloseForm}
        >
          <IoClose />
        </button>
        {!!editingCategory && (
          <button
            className={styles.iconButton}
            type="button"
            disabled={isDeleting}
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
