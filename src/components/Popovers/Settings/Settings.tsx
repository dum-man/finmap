import { MutableRefObject, useRef, useState } from "react";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-hot-toast";
import AccountsModal from "../../Modals/Accounts/Accounts";
import CreateAccountModal from "../../Modals/CreateAccount/CreateAccount";
import CategoriesModal from "../../Modals/Categories/Categories";
import ChangePasswordModal from "../../Modals/ChangePassword/ChangePassword";
import { auth } from "../../../app/firebase";
import { MENU_VARIANTS } from "../../../app/constants";
import { useResetRecoilState } from "recoil";
import { accountsState } from "../../../app/atoms/accountsAtom";
import { transactionsState } from "../../../app/atoms/transactionsAtom";
import { categoriesState } from "../../../app/atoms/categoriesAtom";
import { transfersState } from "../../../app/atoms/transfersAtom";
import styles from "./Popover.module.scss";
import SetLanguage from "../../Modals/SetLanguage/SetLanguage";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

interface SettingsProps {
  setOpen: (open: boolean) => void;
  parentRef: MutableRefObject<null> | null;
}

const Settings: React.FC<SettingsProps> = ({ setOpen, parentRef }) => {
  const [currentUser] = useAuthState(auth);

  const { t, i18n } = useTranslation();

  const resetAccountsState = useResetRecoilState(accountsState);
  const resetTransactionsState = useResetRecoilState(transactionsState);
  const resetTransfersState = useResetRecoilState(transfersState);
  const resetCategoriesState = useResetRecoilState(categoriesState);

  const [accountsModalOpen, setAccountsModalOpen] = useState(false);
  const [createAccountModalOpen, setCreateAccountModalOpen] = useState(false);
  const [incomeCategoriesModalOpen, setIncomeCategoriesModalOpen] = useState(false);
  const [expenseCategoriesModalOpen, setExpenseCategoriesModalOpen] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [languageModalOpen, setLanguageModalOpen] = useState(false);

  const containerRef = useRef(null);

  const handleClickOutside = () => {
    setOpen(false);
  };

  useOnClickOutside(containerRef, parentRef, handleClickOutside);

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
    <motion.div
      className={styles.container}
      variants={MENU_VARIANTS}
      initial="hidden"
      animate="visible"
      exit="exit"
      ref={containerRef}
    >
      <div className={styles.wrapper}>
        <div className={styles.header}>
          {currentUser?.email}
          <button className={styles.logoutButton} onClick={onSignOut}>
            {t("exit")}
          </button>
        </div>
        <div className={styles.menuWrapper}>
          <div className={styles.userAccount}>
            <h3 className={styles.title}>
              {currentUser?.displayName || t("accountType")}
            </h3>
            <ul>
              <li>
                <button
                  className={styles.itemButton}
                  onClick={() => setAccountsModalOpen(true)}
                >
                  {t("accounts")}
                </button>
              </li>
              <li>
                <button
                  className={styles.itemButton}
                  onClick={() => setIncomeCategoriesModalOpen(true)}
                >
                  {t("incomeCategories")}
                </button>
              </li>
              <li>
                <button
                  className={styles.itemButton}
                  onClick={() => setExpenseCategoriesModalOpen(true)}
                >
                  {t("expenseCategories")}
                </button>
              </li>
            </ul>
          </div>
          <div className={styles.settings}>
            <h3 className={styles.title}>{t("settings")}</h3>
            <ul>
              <li>
                <button
                  className={styles.itemButton}
                  onClick={() => setChangePasswordModalOpen(true)}
                >
                  {t("changePassword")}
                </button>
              </li>
              <li>
                <button
                  className={styles.itemButton}
                  onClick={() => setLanguageModalOpen(true)}
                >
                  🌎 {t("language")}:
                  <span className={styles.currentLanguage}>{i18n.resolvedLanguage}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
          {accountsModalOpen && (
            <AccountsModal
              setOpen={setAccountsModalOpen}
              setCreateAccountModalOpen={setCreateAccountModalOpen}
            />
          )}
          {createAccountModalOpen && (
            <CreateAccountModal setOpen={setCreateAccountModalOpen} />
          )}
          {incomeCategoriesModalOpen && (
            <CategoriesModal type="income" setOpen={setIncomeCategoriesModalOpen} />
          )}
          {expenseCategoriesModalOpen && (
            <CategoriesModal type="expense" setOpen={setExpenseCategoriesModalOpen} />
          )}
          {changePasswordModalOpen && (
            <ChangePasswordModal setOpen={setChangePasswordModalOpen} />
          )}
          {languageModalOpen && <SetLanguage setOpen={setLanguageModalOpen} />}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Settings;
