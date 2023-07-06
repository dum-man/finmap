import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { AiOutlineMenu } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
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

    console.log("categories");

    return (
      <ul className={styles.categories}>
        {categories.map((category) => (
          <li key={category.id} className={styles.categoryItem}>
            <AiOutlineMenu size={18} />
            {category.group === "base" ? t(category.label) : category.label}
            <button
              className={classNames(styles.iconButton, styles.editButton)}
              disabled={category.group === "base"}
              onClick={() => onSelectCategory(category)}
            >
              {category.group === "base" ? <RiBankLine /> : <BiEditAlt />}
            </button>
          </li>
        ))}
      </ul>
    );
  }
);

export default CategoriesList;
