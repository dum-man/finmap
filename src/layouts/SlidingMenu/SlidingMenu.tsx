import { useCallback, useRef } from "react";
import FocusTrap from "focus-trap-react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import classNames from "classnames";
import useClickOutside from "hooks/useClickOutside";
import { MENU_VARIANTS } from "app/constants";
import styles from "./SlidingMenu.module.scss";

interface SlidingMenuProps {
  onClose: () => void;
  open: boolean;
  className: string;
  variants?: Variants;
  children: React.ReactNode;
}

const SlidingMenu: React.FC<SlidingMenuProps> = ({
  onClose,
  open,
  className,
  variants = MENU_VARIANTS,
  children,
}) => {
  const ref = useRef(null);

  const handleClose = useCallback(() => onClose(), []);

  useClickOutside(ref, handleClose);

  return (
    <AnimatePresence>
      {open && (
        <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
          <motion.div
            className={classNames(styles.container, className)}
            ref={ref}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {children}
          </motion.div>
        </FocusTrap>
      )}
    </AnimatePresence>
  );
};

export default SlidingMenu;
