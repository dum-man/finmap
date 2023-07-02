import ReactDOM from "react-dom";
import { useMemo } from "react";
import FocusTrap from "focus-trap-react";
import { motion } from "framer-motion";
import { MODAL_VARIANTS } from "app/constants";
import styles from "./Modal.module.scss";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  const containerElement = useMemo(
    () => document.getElementById("portal-container"),
    []
  ) as HTMLElement;

  const element = (
    <motion.div
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      onClick={(evt) => evt.stopPropagation()}
    >
      <FocusTrap
        focusTrapOptions={{ clickOutsideDeactivates: true, onDeactivate: onClose }}
      >
        <motion.div
          className={styles.container}
          variants={MODAL_VARIANTS}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {children}
        </motion.div>
      </FocusTrap>
    </motion.div>
  );

  return ReactDOM.createPortal(element, containerElement);
};

export default Modal;
