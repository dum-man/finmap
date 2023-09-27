import { useAuthState } from "react-firebase-hooks/auth";
import { Trans } from "react-i18next";
import { setFormattedAmount } from "utils/sumUtils/setFormattedAmount";
import { useGetAccountsQuery } from "app/services/accountApi";
import { auth } from "app/config";
import { setCurrencySymbol } from "utils/sumUtils";
import { setFilteredAmount } from "../../helpers";
import styles from "./TotalAmount.module.css";

interface TotalAmountProps {
  currencyCode: string;
  children: React.ReactNode;
}

const TotalAmount: React.FC<TotalAmountProps> = ({ currencyCode, children }) => {
  const [currentUser] = useAuthState(auth);

  const { data: accounts = [] } = useGetAccountsQuery({
    userId: currentUser?.uid!,
  });

  const formattedAndFilteredAmount = setFormattedAmount(
    setFilteredAmount(accounts, currencyCode)
  );

  const currencySymbol = setCurrencySymbol(currencyCode);

  return (
    <div className={styles["wrapper"]}>
      <p className={styles["title"]}>
        <Trans i18nKey="totalAmountOnAccounts" currencySymbol={currencySymbol}>
          {{ currencySymbol }}
        </Trans>
      </p>
      <div className={styles["amount-wrapper"]}>
        {children}
        <p className={styles["amount"]}>{formattedAndFilteredAmount}</p>
      </div>
      <span className={styles["divider"]} />
    </div>
  );
};

export default TotalAmount;
