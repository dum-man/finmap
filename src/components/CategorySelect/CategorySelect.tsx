import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { GoPlus } from "react-icons/go";
import { Select } from "ui";
import { useGetCategoriesQuery } from "app/services/categoryApi";
import { auth } from "app/config";
import { INPUT_LABEL_VARIANTS } from "app/constants";
import { SelectOption } from "types";
import styles from "./CategorySelect.module.scss";

interface CategorySelectProps {
  type: "income" | "expense";
  value: SelectOption | null;
  onChange: (option: SelectOption) => void;
  onOpenCategoryInput: () => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  type,
  value,
  onChange,
  onOpenCategoryInput,
}) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const { data: categories = [] } = useGetCategoriesQuery({
    userId: currentUser?.uid!,
  });

  const options = useMemo(() => {
    return categories.filter((category) => {
      if (category.type === type) {
        return {
          id: category.id,
          group: category.group,
          label: category.label,
        };
      } else {
        return null;
      }
    });
  }, [categories]);

  return (
    <div className={styles.wrapper}>
      <Select
        placeholder={t("category").toString()}
        options={options}
        active={!!value}
        value={value}
        onChange={onChange}
      />
      <AnimatePresence initial={false}>
        {!!value && (
          <motion.span
            className={styles.label}
            variants={INPUT_LABEL_VARIANTS}
            initial="hidden"
            animate="visible"
          >
            {t("category")}
          </motion.span>
        )}
      </AnimatePresence>
      <button className={styles.addButton} type="button" onClick={onOpenCategoryInput}>
        <GoPlus />
      </button>
    </div>
  );
};

export default CategorySelect;
