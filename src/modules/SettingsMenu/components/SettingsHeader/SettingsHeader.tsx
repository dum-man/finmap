import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../../../../firebase";
import styles from "./SettingsHeader.module.scss";

const SettingsHeader: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const onSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className={styles.wrapper}>
      {currentUser?.email}
      <button onClick={onSignOut}>{t("exit")}</button>
    </div>
  );
};

export default SettingsHeader;
