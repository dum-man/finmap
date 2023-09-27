import { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuthState } from "react-firebase-hooks/auth";
import { uuidv4 } from "@firebase/util";
import classNames from "classnames";
import toast from "react-hot-toast";
import { Timestamp } from "firebase/firestore";
import { IoClose } from "react-icons/io5";
import { BsCheckLg } from "react-icons/bs";
import {
  useCreateCategoryMutation,
  useLazyCheckCategoryExistsQuery,
} from "app/services/categoryApi";
import { InputLabel } from "ui";
import { auth } from "app/config";
import { Category, SelectOption } from "types";
import styles from "./CategoryInput.module.css";

interface CategoryInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: "income" | "expense";
  onChangeCategory: (category: SelectOption) => void;
  onClose: () => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  type,
  onChangeCategory,
  onClose,
  ...restProps
}) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const inputId = useId();

  const [checkCategoryExists] = useLazyCheckCategoryExistsQuery();
  const [createCategory] = useCreateCategoryMutation();

  const [categoryName, setCategoryName] = useState("");
  const [categoryCreating, setCategoryCreating] = useState(false);
  const [isActive, setIsActive] = useState(Boolean(categoryName.length));

  const handleFocus = () => {
    if (!isActive) {
      setIsActive(true);
    }
  };

  const handleBlur = () => {
    if (!categoryName.length) {
      setIsActive(false);
    }
  };

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
        type: category.type,
      }).unwrap();
      if (categoryExists) {
        throw new Error(`You already have "${category.label}" category`);
      }
      const data = await createCategory({
        userId: currentUser.uid,
        category,
      }).unwrap();
      onChangeCategory(data);
      onCloseCategoryInput();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message);
      }
    }
    setCategoryCreating(false);
  };

  return (
    <div className={styles["wrapper"]}>
      <InputLabel id={inputId} label={t("categoryName")} isActive={isActive} />
      <input
        id={inputId}
        className={classNames("input", styles["input"])}
        maxLength={20}
        disabled={categoryCreating}
        value={categoryName}
        onChange={onChangeCategoryName}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...restProps}
      />
      <div className={styles["buttons"]}>
        <button
          className={classNames("icon-button", styles["icon-button"])}
          type="button"
          disabled={categoryCreating}
        >
          <BsCheckLg className={styles["submit-icon"]} onClick={handleCreateCategory} />
        </button>
        <button
          className={classNames("icon-button", styles["icon-button"])}
          type="button"
          disabled={categoryCreating}
          onClick={onCloseCategoryInput}
        >
          <IoClose />
        </button>
      </div>
    </div>
  );
};

export default CategoryInput;
