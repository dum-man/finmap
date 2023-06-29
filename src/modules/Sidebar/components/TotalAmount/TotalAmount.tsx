import { useTranslation } from "react-i18next";
import { setFormattedAmount } from "utils/setFormattedAmount";
import styles from "./TotalAmount.module.scss";

interface TotalAmountProps {
  totalAmount: number;
}

const TotalAmount: React.FC<TotalAmountProps> = ({ totalAmount }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t("totalAmountOnAccounts")}</p>
      <p className={styles.amount}>{setFormattedAmount(totalAmount)}</p>
      <span className={styles.divider} />
    </div>
  );
};

export default TotalAmount;
