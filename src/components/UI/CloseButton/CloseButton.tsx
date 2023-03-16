import styles from "./CloseButton.module.scss";
import { IoClose } from "react-icons/io5";

interface CloseButtonProps {
  onClose: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => {
  return (
    <button className={styles.close} type="button" onClick={onClose}>
      <IoClose />
      <span className="visually-hidden">Close</span>
    </button>
  );
};

export default CloseButton;
