import { MutableRefObject, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import SetUsernameModal from "../../Modals/SetUsername/SetUsername";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { auth } from "../../../app/firebase";
import { POPOVER_VARIANTS } from "../../../app/constants";
import styles from "./Popover.module.scss";

interface UserAccountProps {
  setOpen: (open: boolean) => void;
  parentRef: MutableRefObject<null> | null;
}

const UserAccount: React.FC<UserAccountProps> = ({ setOpen, parentRef }) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const [modalOpen, setModalOpen] = useState(false);

  const containerRef = useRef(null);

  const handleClickOutside = () => {
    setOpen(false);
  };

  useOnClickOutside(containerRef, parentRef, handleClickOutside);

  return (
    <motion.div
      className={styles.container}
      variants={POPOVER_VARIANTS}
      initial="hidden"
      animate="visible"
      exit="exit"
      ref={containerRef}
    >
      <p className={styles.name}>{currentUser?.displayName || t("accountType")}</p>
      <span className={styles.divider} />
      <div className={styles.buttonWrapper}>
        <button className={styles.editButton} onClick={() => setModalOpen(true)}>
          {t("edit")}
        </button>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {modalOpen && <SetUsernameModal setOpen={setModalOpen} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserAccount;
