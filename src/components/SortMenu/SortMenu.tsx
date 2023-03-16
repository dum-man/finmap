import { useTranslation } from "react-i18next";
import { HiArrowDown } from "react-icons/hi";
import useAppContext from "../../hooks/useAppContext";
import styles from "./SortMenu.module.scss";

const SortMenu: React.FC = () => {
  const { t } = useTranslation();

  const { sortState, sortDispatch } = useAppContext();

  return (
    <div className={styles.wrapper}>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <button
            className={styles.menuButton}
            onClick={() => sortDispatch("transcationType")}
          >
            {t("type")}
            <HiArrowDown
              className={sortState.transcationType === "up" ? styles.rotate : ""}
            />
          </button>
        </li>
        <li className={styles.menuItem}>
          <button className={styles.menuButton} onClick={() => sortDispatch("dateType")}>
            {t("date")}
            <HiArrowDown className={sortState.dateType === "up" ? styles.rotate : ""} />
          </button>
        </li>
        <li className={styles.menuItem}>
          <button
            className={styles.menuButton}
            onClick={() => sortDispatch("amountType")}
          >
            {t("amount")}
            <HiArrowDown className={sortState.amountType === "up" ? styles.rotate : ""} />
          </button>
        </li>
        <li className={styles.menuItem}>{t("account/balance")}</li>
        <li className={styles.menuItem}>{t("category")}</li>
        <li className={styles.menuItem}>{t("comment")}</li>
      </ul>
    </div>
  );
};

export default SortMenu;
