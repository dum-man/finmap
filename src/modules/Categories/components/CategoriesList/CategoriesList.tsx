import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { BiEditAlt, BiUser } from "react-icons/bi";
import { RiBankLine } from "react-icons/ri";
import useAppSelector from "hooks/useAppSelector";
import { useGetCategoriesQuery } from "app/services/categoryApi";
import { Loader } from "ui/index";
import { auth } from "app/config";
import NotFound from "../NotFound/NotFound";
import { Category } from "types";
import styles from "./CategoriesList.module.scss";

interface CategoriesListProps {
  onSelectCategory: (category: Category) => void;
}

const CategoriesList: React.FC<CategoriesListProps> = React.memo(
  ({ onSelectCategory }) => {
    const { t } = useTranslation();

    const [currentUser] = useAuthState(auth);

    const categoryType = useAppSelector((state) => state.app.categoryType);

    const { data: categories = [], isLoading } = useGetCategoriesQuery({
      userId: currentUser?.uid!,
    });

    const transactionCategories = categories.filter(
      (category) => category.type === categoryType
    );

    if (isLoading) {
      return <Loader />;
    }

    if (!transactionCategories.length) {
      return <NotFound />;
    }

    return (
      <ul className={styles.categories}>
        {transactionCategories.map((category) => (
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
