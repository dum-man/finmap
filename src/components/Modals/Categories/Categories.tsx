import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Timestamp } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { RiBankLine, RiDeleteBinLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { BsCheckLg } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import Modal from "../../UI/Modal/Modal";
import CloseButton from "../../UI/CloseButton/CloseButton";
import { createCategory, deleteCategory } from "../../../app/service/categoriesService";
import { auth } from "../../../app/firebase";
import { categoriesState } from "../../../app/atoms/categoriesAtom";
import {
  INPUT_LABEL_VARIANTS,
  INPUT_LENGTH_VARIANTS,
  CATEGORY_VARIANTS,
} from "../../../app/constants";
import { Category } from "../../../types";
import styles from "./Modal.module.scss";

interface CategoriesModalProps {
  type: "income" | "expense";
  setOpen: (open: boolean) => void;
}

const CategoriesModal: React.FC<CategoriesModalProps> = ({ type, setOpen }) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const [{ categories }, setCategoriesStateValue] = useRecoilState(categoriesState);

  const [formVisible, setFormVisible] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryLengthVisible, setCategoryLengthVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryCreatingOrDeleting, setCategoryCreatingOrDeleting] = useState(false);

  const onCategoryNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value.length > 20) {
      return;
    }
    setCategoryName(evt.target.value);
  };

  const onSelectEditingCategory = (category: Category) => {
    setCategoryName(category.label);
    setEditingCategory(category);
    setFormVisible(true);
  };

  const onCloseForm = () => {
    setFormVisible(false);
    setEditingCategory(null);
    setCategoryName("");
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
    setCategoryCreatingOrDeleting(true);
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
    setCategoryCreatingOrDeleting(false);
  };

  const handleDeleteCategory = async () => {
    if (!editingCategory) {
      toast.error(t("categorySelectedError"));
      return;
    }
    setCategoryCreatingOrDeleting(true);
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
    setCategoryCreatingOrDeleting(false);
  };

  return (
    <Modal onClose={() => setOpen(false)}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t(`${type}Categories`)}</h2>
        <CloseButton onClose={() => setOpen(false)} />
        <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
          {formVisible ? (
            <motion.form
              className={styles.wrapper}
              variants={CATEGORY_VARIANTS}
              initial="hidden"
              animate="visible"
              onSubmit={handleCreateOrEditCategory}
            >
              <div className={styles.inputWrapper}>
                <input
                  className={`${styles.input} ${categoryName ? styles.inputActive : ""}`}
                  id="name"
                  placeholder={t("categoryName").toString()}
                  disabled={categoryCreatingOrDeleting}
                  value={categoryName}
                  onChange={onCategoryNameChange}
                  onFocus={() => setCategoryLengthVisible(true)}
                  onBlur={() => setCategoryLengthVisible(false)}
                />
                {categoryName && (
                  <motion.label
                    className={styles.label}
                    htmlFor="name"
                    variants={INPUT_LABEL_VARIANTS}
                    initial="hidden"
                    animate="visible"
                  >
                    {t("categoryName")}
                  </motion.label>
                )}
                <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
                  {categoryLengthVisible && (
                    <motion.span
                      className={styles.inputLength}
                      variants={INPUT_LENGTH_VARIANTS}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {20 - categoryName.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <button
                className={styles.iconButton}
                type="submit"
                disabled={categoryCreatingOrDeleting}
              >
                <BsCheckLg className={styles.submitIcon} />
              </button>
              <button
                className={styles.iconButton}
                type="button"
                disabled={categoryCreatingOrDeleting}
                onClick={onCloseForm}
              >
                <IoClose />
              </button>
              {editingCategory && (
                <button
                  className={styles.iconButton}
                  type="button"
                  disabled={categoryCreatingOrDeleting}
                  onClick={handleDeleteCategory}
                >
                  <RiDeleteBinLine className={styles.deleteIcon} />
                </button>
              )}
            </motion.form>
          ) : (
            <motion.button
              className={styles.button}
              variants={CATEGORY_VARIANTS}
              initial="hidden"
              animate="visible"
              onClick={() => setFormVisible(true)}
            >
              {t("addCategory")}
            </motion.button>
          )}
        </AnimatePresence>
        <ul className={styles.categoryList}>
          {categories[type].map((category) => (
            <li key={category.id} className={styles.categoryItem}>
              <AiOutlineMenu size={18} />
              {category.group === "base" ? t(category.label) : category.label}
              <button
                className={`${styles.iconButton} ${styles.editButton}`}
                disabled={category.group === "base"}
                onClick={() => onSelectEditingCategory(category)}
              >
                {category.group === "base" ? <RiBankLine /> : <BiEditAlt />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default CategoriesModal;
