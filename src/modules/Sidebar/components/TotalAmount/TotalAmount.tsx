import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { accountsState } from "../../../../app/atoms/accountsAtom";
import { setFormattedAmount } from "../../../../utils/setFormattedAmount";
import styles from "./TotalAmount.module.scss";

const TotalAmount: React.FC = () => {
  const { t } = useTranslation();

  const { accounts } = useRecoilValue(accountsState);

  const accountsTotalSum = useMemo(() => {
    return accounts.reduce((acc, current) => acc + current.balance, 0);
  }, [accounts]);

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t("totalAmountOnAccounts")}</p>
      <p className={styles.amount}>{setFormattedAmount(accountsTotalSum)}</p>
      <span className={styles.divider} />
    </div>
  );
};

export default TotalAmount;
