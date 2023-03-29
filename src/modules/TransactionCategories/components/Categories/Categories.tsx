import { useRecoilValue } from "recoil";
import { useTranslation } from "react-i18next";
import { AiOutlineMenu } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiBankLine } from "react-icons/ri";
import { categoriesState } from "../../../../app/atoms/categoriesAtom";
import { Category } from "../../../../types";
import styles from "./Categories.module.scss";

interface CategoriesProps {
  type: "income" | "expense";
  onSelectCategory: (category: Category) => void;
}

const Categories: React.FC<CategoriesProps> = ({ type, onSelectCategory }) => {
  const { t } = useTranslation();

  const { categories } = useRecoilValue(categoriesState);

  return (
    <ul className={styles.categoriesList}>
      {categories[type].map((category) => (
        <li key={category.id} className={styles.categoryItem}>
          <AiOutlineMenu size={18} />
          {category.group === "base" ? t(category.label) : category.label}
          <button
            className={`${styles.iconButton} ${styles.editButton}`}
            disabled={category.group === "base"}
            onClick={() => onSelectCategory(category)}
          >
            {category.group === "base" ? <RiBankLine /> : <BiEditAlt />}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Categories;
