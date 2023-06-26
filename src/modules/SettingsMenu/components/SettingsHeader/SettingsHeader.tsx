import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../../../../firebase";
import styles from "./SettingsHeader.module.scss";
import { useDispatch } from "react-redux";
import { toggleSettingsMenuOpen } from "../../../../app/slices/appSlice";

const SettingsHeader: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(toggleSettingsMenuOpen(false));
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className={styles.wrapper}>
      {currentUser?.email}
      <button onClick={handleSignOut}>{t("exit")}</button>
    </div>
  );
};

export default SettingsHeader;
