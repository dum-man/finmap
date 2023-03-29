import { MutableRefObject, useRef } from "react";
import { motion } from "framer-motion";
import AccountType from "../AccountType/AccountType";
import EditAccountButton from "../EditAccountButton/EditAccountButton";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";
import { VARIANTS } from "../../constants";
import styles from "./UserAccountMenu.module.scss";

interface UserAccountMenuProps {
  setOpen: (open: React.SetStateAction<boolean>) => void;
  parentRef: MutableRefObject<null> | null;
  setSetUsernameOpen: (open: React.SetStateAction<boolean>) => void;
  children: React.ReactNode;
}

const UserAccountMenu: React.FC<UserAccountMenuProps> = ({
  setOpen,
  parentRef,
  setSetUsernameOpen,
  children,
}) => {
  const containerRef = useRef(null);

  const handleClickOutside = () => {
    setOpen(false);
  };

  useOnClickOutside(containerRef, parentRef, handleClickOutside);

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
      {children}
    </motion.div>
  );
};

export default UserAccountMenu;
