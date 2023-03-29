import { useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { uuidv4 } from "@firebase/util";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Timestamp } from "firebase/firestore";
import { BsCheckLg } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { Select } from "../../ui";
import { categoriesState } from "../../app/atoms/categoriesAtom";
import { createCategory } from "../../app/api";
import { INPUT_LABEL_VARIANTS } from "../../app/constants";
import { auth } from "../../firebase";
import { Category, SelectOption } from "../../types";
import styles from "./CategorySelect.module.scss";

interface CategorySelectProps {
  type: "income" | "expense";
  value: SelectOption | null;
  onChange: (option: SelectOption) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ type, value, onChange }) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const [{ categories }, setCategoriesStateValue] = useRecoilState(categoriesState);

  const options = useMemo(() => {
    return categories[type].map((category) => ({
      id: category.id,
      group: category.group,
      label: category.label,
    }));
  }, [categories, type]);

  const [categoryName, setCategoryName] = useState("");
  const [categoryCreating, setCategoryCreating] = useState(false);
  const [categoryInputVisible, setCategoryInputVisible] = useState(false);

  const onOpenCategoryInput = () => {
    setCategoryInputVisible(true);
  };

  const onCloseCategoryInput = () => {
    setCategoryInputVisible(false);
    setCategoryName("");
  };

  const onChangeCategoryName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value.length > 20) {
      return;
    }
    setCategoryName(evt.target.value);
  };

  const handleCreateCategory = async () => {
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
      await createCategory(currentUser?.uid, category);
      setCategoriesStateValue((prev) => ({
        ...prev,
        categories: {
          ...prev.categories,
          [type]: [...prev.categories[type], category],
        },
      }));
      onCloseCategoryInput();
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    setCategoryCreating(false);
  };

  return (
    <div className={styles.inputWrapper}>
      {categoryInputVisible ? (
        <>
          <input
            className={`${styles.input} ${categoryName ? styles.inputActive : ""}`}
            placeholder={t("categoryName").toString()}
            disabled={categoryCreating}
            value={categoryName}
            onChange={onChangeCategoryName}
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
          <div className={styles.categoryButtons}>
            <button
              className={styles.iconButton}
              type="button"
              disabled={categoryCreating}
            >
              <BsCheckLg className={styles.submitButton} onClick={handleCreateCategory} />
            </button>
            <button
              className={styles.iconButton}
              type="button"
              disabled={categoryCreating}
              onClick={onCloseCategoryInput}
            >
              <IoClose />
            </button>
          </div>
        </>
      ) : (
        <>
          <Select
            placeholder={t("category").toString()}
            options={options}
            active={!!value}
            value={value}
            onChange={onChange}
          />
          {value && (
            <motion.span
              className={styles.label}
              variants={INPUT_LABEL_VARIANTS}
              initial="hidden"
              animate="visible"
            >
              {t("category")}
            </motion.span>
          )}
          <button
            className={`${styles.iconButton} ${styles.addButton}`}
            type="button"
            onClick={onOpenCategoryInput}
          >
            <GoPlus />
          </button>
        </>
      )}
    </div>
  );
};

export default CategorySelect;
