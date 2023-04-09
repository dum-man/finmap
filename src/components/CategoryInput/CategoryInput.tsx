import { useState } from "react";
import { useTranslation } from "react-i18next";
import { uuidv4 } from "@firebase/util";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Timestamp } from "firebase/firestore";
import { IoClose } from "react-icons/io5";
import { BsCheckLg } from "react-icons/bs";
import {
  useCreateCategoryMutation,
  useLazyCheckCategoryExistsQuery,
} from "../../app/services/categoryApi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { INPUT_LABEL_VARIANTS } from "../../app/constants";
import { Category, SelectOption } from "../../types";
import styles from "./CategoryInput.module.scss";

interface CategoryInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: "income" | "expense";
  onSelectCategory: (category: SelectOption) => void;
  onClose: () => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  type,
  onSelectCategory,
  onClose,
  ...restProps
}) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const [checkCategoryExists] = useLazyCheckCategoryExistsQuery();
  const [createCategory] = useCreateCategoryMutation();

  const [categoryName, setCategoryName] = useState("");
  const [categoryCreating, setCategoryCreating] = useState(false);

  const onCloseCategoryInput = () => {
    onClose();
    setCategoryName("");
  };

  const onChangeCategoryName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(evt.target.value);
  };

  const handleCreateCategory = async () => {
    if (!currentUser) {
      return;
    }

    const formattedCategoryName = categoryName.trim();

    if (!formattedCategoryName) {
      toast.error(t("categoryNameError"));
      return;
    }
    const category: Category = {
      id: uuidv4(),
      group: "user",
      type,
      label: formattedCategoryName,
      createdAt: Timestamp.now(),
    };
    setCategoryCreating(true);
    try {
      const categoryExists = await checkCategoryExists({
        userId: currentUser.uid,
        label: category.label,
      }).unwrap();
      if (categoryExists) {
        throw new Error(`You already have "${category.label}" category`);
      }
      const data = await createCategory({
        userId: currentUser.uid,
        category,
      }).unwrap();
      onSelectCategory(data);
      onCloseCategoryInput();
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    setCategoryCreating(false);
  };

  return (
    <div className={styles.wrapper}>
      <input
        className={`${styles.input} ${categoryName ? styles.active : ""}`}
        placeholder={t("categoryName").toString()}
        maxLength={20}
        disabled={categoryCreating}
        value={categoryName}
        onChange={onChangeCategoryName}
        {...restProps}
      />
      {categoryName && (
        <motion.span
          className={styles.label}
          variants={INPUT_LABEL_VARIANTS}
          initial="hidden"
          animate="visible"
        >
          {t("categoryName")}
        </motion.span>
      )}
      <div className={styles.buttons}>
        <button type="button" disabled={categoryCreating}>
          <BsCheckLg className={styles.submitIcon} onClick={handleCreateCategory} />
        </button>
        <button type="button" disabled={categoryCreating} onClick={onCloseCategoryInput}>
          <IoClose />
        </button>
      </div>
    </div>
  );
};

export default CategoryInput;
