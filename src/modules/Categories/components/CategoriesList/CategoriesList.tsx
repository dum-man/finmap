import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { BiEditAlt, BiUser } from "react-icons/bi";
import { RiBankLine } from "react-icons/ri";
import { Category } from "types";
import { RootState } from "app/store";
import styles from "./CategoriesList.module.scss";

interface CategoriesListProps {
  transactionCategories: Category[];
  onSelectCategory: (category: Category) => void;
}

const CategoriesList: React.FC<CategoriesListProps> = React.memo(
  ({ transactionCategories, onSelectCategory }) => {
    const { t } = useTranslation();

    const categoryType = useSelector((state: RootState) => state.app.categoryType);

    const categories = useMemo(() => {
      return transactionCategories.filter((category) => category.type === categoryType);
    }, [transactionCategories, categoryType]);

    return (
      <ul className={styles.categories}>
        {categories.map((category) => (
          <li key={category.id} className={styles.categoryItem}>
            <div className={styles.wrapper}>
              {category.group === "base" ? (
                <RiBankLine className={styles.icon} />
              ) : (
                <BiUser className={styles.icon} />
              )}
              <p>{category.group === "base" ? t(category.label) : category.label}</p>
              {category.group === "user" && (
                <button
                  className={styles.iconButton}
                  onClick={() => onSelectCategory(category)}
                >
                  <BiEditAlt />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    );
  }
);

export default CategoriesList;
