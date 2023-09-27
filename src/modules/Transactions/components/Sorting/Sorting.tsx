import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { HiArrowDown } from "react-icons/hi";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import {
  toggleAmountType,
  toggleDateType,
  toggleTransactionType,
} from "app/slices/sortSlice";
import styles from "./Sorting.module.css";

const Sorting: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { transactionType, dateType, amountType } = useAppSelector((state) => state.sort);

  return (
    <div className={styles["wrapper"]}>
      <ul className={styles["sort-list"]}>
        <li className={styles["sort-item"]}>
          <button
            className={styles["button"]}
            onClick={() => dispatch(toggleTransactionType())}
          >
            {t("type")}
            <HiArrowDown
              className={classNames({
                [styles["rotate"]]: transactionType === "UP",
              })}
            />
          </button>
        </li>
        <li className={styles["sort-item"]}>
          <button className={styles["button"]} onClick={() => dispatch(toggleDateType())}>
            {t("date")}
            <HiArrowDown
              className={classNames({
                [styles["rotate"]]: dateType === "UP",
              })}
            />
          </button>
        </li>
        <li className={styles["sort-item"]}>
          <button
            className={styles["button"]}
            onClick={() => dispatch(toggleAmountType())}
          >
            {t("amount")}
            <HiArrowDown
              className={classNames({
                [styles["rotate"]]: amountType === "UP",
              })}
            />
          </button>
        </li>
        <li className={styles["sort-item"]}>{t("account/balance")}</li>
        <li className={styles["sort-item"]}>{t("category")}</li>
        <li className={styles["sort-item"]}>{t("comment")}</li>
      </ul>
    </div>
  );
};

export default Sorting;
