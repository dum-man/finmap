import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { auth } from "../../../../firebase";
import styles from "./AccountType.module.scss";

const AccountType: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  return (
    <p className={styles.accountType}>{currentUser?.displayName || t("accountType")}</p>
  );
};

export default AccountType;
