import { MutableRefObject, useRef } from "react";
import { motion } from "framer-motion";
import AccountType from "../AccountType/AccountType";
import EditAccountButton from "../EditAccountButton/EditAccountButton";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";
import { VARIANTS } from "../../constants";
import styles from "./UserAccountMenu.module.scss";

interface UserAccountMenuProps {
  onClose: () => void;
  parentRef: MutableRefObject<null> | null;
  setSetUsernameOpen: (open: React.SetStateAction<boolean>) => void;
}

const UserAccountMenu: React.FC<UserAccountMenuProps> = ({
  onClose,
  parentRef,
  setSetUsernameOpen,
}) => {
  const containerRef = useRef(null);

  useOnClickOutside(containerRef, parentRef, onClose);

  return (
    <motion.div
      className={styles.container}
      variants={VARIANTS}
      initial="hidden"
      animate="visible"
      exit="exit"
      ref={containerRef}
    >
      <AccountType />
      <span className={styles.divider} />
      <EditAccountButton setOpen={setSetUsernameOpen} />
    </motion.div>
  );
};

export default UserAccountMenu;
