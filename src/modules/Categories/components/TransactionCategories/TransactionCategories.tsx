import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineMenu } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiBankLine } from "react-icons/ri";
import { Category } from "../../../../types";
import styles from "./TransactionCategories.module.scss";

interface TransactionCategoriesProps {
  type: "income" | "expense";
  transactionCategories: Category[];
  onSelectCategory: (category: Category) => void;
}

const TransactionCategories: React.FC<TransactionCategoriesProps> = ({
  type,
  transactionCategories,
  onSelectCategory,
}) => {
  const { t } = useTranslation();

  const categories = useMemo(() => {
    return transactionCategories.filter((category) => category.type === type);
  }, [transactionCategories, type]);

  return (
    <ul className={styles.categories}>
      {categories.map((category) => (
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

export default TransactionCategories;
