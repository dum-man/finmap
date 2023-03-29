import { useTranslation } from "react-i18next";
import { HiArrowDown } from "react-icons/hi";
import useAppContext from "../../../../hooks/useAppContext";
import styles from "./Sorting.module.scss";

const Sorting: React.FC = () => {
  const { t } = useTranslation();

  const { sortState, sortDispatch } = useAppContext();

  return (
    <div className={styles.wrapper}>
      <ul className={styles.sortList}>
        <li className={styles.sortItem}>
          <button
            className={styles.button}
            onClick={() => sortDispatch("transcationType")}
          >
            {t("type")}
            <HiArrowDown
              className={sortState.transcationType === "up" ? styles.rotate : ""}
            />
          </button>
        </li>
        <li className={styles.sortItem}>
          <button className={styles.button} onClick={() => sortDispatch("dateType")}>
            {t("date")}
            <HiArrowDown className={sortState.dateType === "up" ? styles.rotate : ""} />
          </button>
        </li>
        <li className={styles.sortItem}>
          <button className={styles.button} onClick={() => sortDispatch("amountType")}>
            {t("amount")}
            <HiArrowDown className={sortState.amountType === "up" ? styles.rotate : ""} />
          </button>
        </li>
        <li className={styles.sortItem}>{t("account/balance")}</li>
        <li className={styles.sortItem}>{t("category")}</li>
        <li className={styles.sortItem}>{t("comment")}</li>
      </ul>
    </div>
  );
};

export default Sorting;
