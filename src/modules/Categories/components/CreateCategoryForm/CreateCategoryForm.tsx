import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { uuidv4 } from "@firebase/util";
import classNames from "classnames";
import toast from "react-hot-toast";
import { BsCheckLg } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { Timestamp } from "firebase/firestore";
import useAppSelector from "hooks/useAppSelector";
import { TextInput } from "components";
import { Spinner } from "ui";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useLazyCheckCategoryExistsQuery,
} from "app/services/categoryApi";
import { auth } from "app/config";
import { Category } from "types";
import styles from "./CreateCategoryForm.module.css";

interface CreateCategoryFormProps {
  categoryName: string;
  setCategoryName: (name: React.SetStateAction<string>) => void;
  editingCategory: Category | null;
  setEditingCategory: (category: React.SetStateAction<Category | null>) => void;
  setFormVisible: (visible: React.SetStateAction<boolean>) => void;
}

const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({
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

  const categoryType = useAppSelector((state) => state.app.categoryType);

  const handleChangeCategoryName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(evt.target.value);
  };

  const handleCreateOrEditCategory = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!currentUser || !categoryType) {
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
        type: categoryType,
        label: formattedCategoryName,
        createdAt: Timestamp.now(),
      };
    }
    setCategoryCreating(true);
    try {
      const categoryExists = await checkCategoryExists({
        userId: currentUser.uid,
        label: category.label,
        type: category.type,
      }).unwrap();
      if (categoryExists) {
        throw new Error(`You already have "${category.label}" category`);
      }
      await createCategory({ userId: currentUser.uid, category }).unwrap();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message);
      }
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
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message);
      }
    }
    onCloseForm();
  };

  const onCloseForm = () => {
    setFormVisible(false);
    setEditingCategory(null);
    setCategoryName("");
  };

  return (
    <form className={styles["wrapper"]} onSubmit={handleCreateOrEditCategory}>
      <TextInput
        label={t("categoryName")}
        maxLength={20}
        value={categoryName}
        onChange={handleChangeCategoryName}
      />
      <div className={styles["buttons"]}>
        {!categoryCreating ? (
          <button
            className={classNames("icon-button", styles["icon-button"])}
            type="submit"
          >
            <BsCheckLg className={styles["submit-icon"]} />
          </button>
        ) : (
          <Spinner variant="dark" />
        )}
        <button
          className={classNames("icon-button", styles["icon-button"])}
          type="button"
          disabled={categoryCreating || isDeleting}
          onClick={onCloseForm}
        >
          <IoClose />
        </button>
        {Boolean(editingCategory) && (
          <button
            className={classNames("icon-button", styles["icon-button"])}
            type="button"
            disabled={isDeleting}
            onClick={handleDeleteCategory}
          >
            <RiDeleteBinLine className={styles["delete-icon"]} />
          </button>
        )}
      </div>
    </form>
  );
};

export default CreateCategoryForm;
