import { useAuthState } from "react-firebase-hooks/auth";
import { useResetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { accountsState } from "../../../../app/atoms/accountsAtom";
import { categoriesState } from "../../../../app/atoms/categoriesAtom";
import { transactionsState } from "../../../../app/atoms/transactionsAtom";
import { transfersState } from "../../../../app/atoms/transfersAtom";
import { auth } from "../../../../firebase";
import styles from "./SettingsHeader.module.scss";

const SettingsHeader: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const resetAccountsState = useResetRecoilState(accountsState);
  const resetTransactionsState = useResetRecoilState(transactionsState);
  const resetTransfersState = useResetRecoilState(transfersState);
  const resetCategoriesState = useResetRecoilState(categoriesState);

  const onSignOut = async () => {
    try {
      await signOut(auth);
      resetAccountsState();
      resetTransactionsState();
      resetTransfersState();
      resetCategoriesState();
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className={styles.wrapper}>
      {currentUser?.email}
      <button className={styles.logoutButton} onClick={onSignOut}>
        {t("exit")}
      </button>
    </div>
  );
};

export default SettingsHeader;
