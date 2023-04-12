import { useTranslation } from "react-i18next";
import classNames from "classnames";
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
              className={classNames({
                [styles.rotate]: sortState.transcationType === "up",
              })}
            />
          </button>
        </li>
        <li className={styles.sortItem}>
          <button className={styles.button} onClick={() => sortDispatch("dateType")}>
            {t("date")}
            <HiArrowDown
              className={classNames({
                [styles.rotate]: sortState.dateType === "up",
              })}
            />
          </button>
        </li>
        <li className={styles.sortItem}>
          <button className={styles.button} onClick={() => sortDispatch("amountType")}>
            {t("amount")}
            <HiArrowDown
              className={classNames({
                [styles.rotate]: sortState.amountType === "up",
              })}
            />
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
