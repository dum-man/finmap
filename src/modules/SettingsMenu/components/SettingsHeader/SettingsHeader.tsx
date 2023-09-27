import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import useAppDispatch from "hooks/useAppDispatch";
import { auth } from "app/config";
import { toggleSettingsMenuOpen } from "app/slices/appSlice";
import styles from "./SettingsHeader.module.css";

const SettingsHeader: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(toggleSettingsMenuOpen(false));
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message);
      }
    }
  };
  return (
    <div className={styles["wrapper"]}>
      {currentUser?.email}
      <button onClick={handleSignOut}>{t("exit")}</button>
    </div>
  );
};

export default SettingsHeader;
