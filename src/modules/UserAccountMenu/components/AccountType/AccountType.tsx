import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { auth } from "app/config";
import styles from "./AccountType.module.css";

const AccountType: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  return (
    <p className={styles["account-type"]}>
      {currentUser?.displayName || t("accountType")}
    </p>
  );
};

export default AccountType;
