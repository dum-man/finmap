import { MutableRefObject, useRef } from "react";
import { motion } from "framer-motion";
import AccountItems from "../AccountItems/AccountItems";
import SettingsHeader from "../SettingsHeader/SettingsHeader";
import SettingsItems from "../SettingsItems/SettingsItems";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";
import { MENU_VARIANTS } from "../../../../app/constants";
import styles from "./SettingsMenu.module.scss";

interface SettingsMenuProps {
  onClose: () => void;
  parentRef: MutableRefObject<null> | null;
  setAccountsOpen: (open: React.SetStateAction<boolean>) => void;
  setTransactionCategoriesOpen: (open: React.SetStateAction<boolean>) => void;
  setCategoryType: (
    category: React.SetStateAction<"income" | "expense" | undefined>
  ) => void;
  setChangePasswordOpen: (open: React.SetStateAction<boolean>) => void;
  setSetLanguageOpen: (open: React.SetStateAction<boolean>) => void;
  children: React.ReactNode;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({
  onClose,
  parentRef,
  setAccountsOpen,
  setTransactionCategoriesOpen,
  setCategoryType,
  setChangePasswordOpen,
  setSetLanguageOpen,
  children,
}) => {
  const containerRef = useRef(null);

  useOnClickOutside(containerRef, parentRef, onClose);

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
        <SettingsHeader />
        <div className={styles.menuWrapper}>
          <AccountItems
            setAccountsOpen={setAccountsOpen}
            setTransactionCategoriesOpen={setTransactionCategoriesOpen}
            setCategoryType={setCategoryType}
          />
          <SettingsItems
            setChangePasswordOpen={setChangePasswordOpen}
            setSetLanguageOpen={setSetLanguageOpen}
          />
        </div>
      </div>
      {children}
    </motion.div>
  );
};

export default SettingsMenu;
