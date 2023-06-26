import ReactDOM from "react-dom";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { MODAL_VARIANTS } from "../../app/constants";
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

  const handleClose = (evt: React.MouseEvent<HTMLDivElement>) => {
    onClose();
    evt.stopPropagation();
  };

  const element = (
    <motion.div
      className={styles.backdrop}
      onClick={handleClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
    >
      <motion.div
        className={styles.container}
        onClick={(evt) => evt.stopPropagation()}
        variants={MODAL_VARIANTS}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </motion.div>
  );

  return ReactDOM.createPortal(element, containerElement);
};

export default Modal;
