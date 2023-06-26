import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { HiArrowDown } from "react-icons/hi";
import {
  toggleAmountType,
  toggleDateType,
  toggleTranscationType,
} from "../../../../app/slices/sortSlice";
import { RootState } from "../../../../app/store";
import styles from "./Sorting.module.scss";

const Sorting: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { transcationType, dateType, amountType } = useSelector(
    (state: RootState) => state.sort
  );

  return (
    <div className={styles.wrapper}>
      <ul className={styles.sortList}>
        <li className={styles.sortItem}>
          <button
            className={styles.button}
            onClick={() => dispatch(toggleTranscationType())}
          >
            {t("type")}
            <HiArrowDown
              className={classNames({
                [styles.rotate]: transcationType === "UP",
              })}
            />
          </button>
        </li>
        <li className={styles.sortItem}>
          <button className={styles.button} onClick={() => dispatch(toggleDateType())}>
            {t("date")}
            <HiArrowDown
              className={classNames({
                [styles.rotate]: dateType === "UP",
              })}
            />
          </button>
        </li>
        <li className={styles.sortItem}>
          <button className={styles.button} onClick={() => dispatch(toggleAmountType())}>
            {t("amount")}
            <HiArrowDown
              className={classNames({
                [styles.rotate]: amountType === "UP",
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
