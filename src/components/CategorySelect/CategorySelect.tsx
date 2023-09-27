import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { GoPlus } from "react-icons/go";
import { Select } from "ui";
import { useGetCategoriesQuery } from "app/services/categoryApi";
import { auth } from "app/config";
import { SelectOption } from "types";
import styles from "./CategorySelect.module.css";

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
    <div className={styles["wrapper"]}>
      <Select
        label={t("category").toString()}
        options={options}
        value={value}
        onChange={onChange}
      />
      <div className={styles["button-wrapper"]}>
        <button
          className={classNames("icon-button", styles["icon-button"])}
          type="button"
          onClick={onOpenCategoryInput}
        >
          <GoPlus />
        </button>
      </div>
    </div>
  );
};

export default CategorySelect;
