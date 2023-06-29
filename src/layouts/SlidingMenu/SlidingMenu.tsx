import { useCallback, useRef } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import useClickOutside from "hooks/useClickOutside";
import { MENU_VARIANTS } from "app/constants";

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
        <motion.div
          className={className}
          ref={ref}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SlidingMenu;
