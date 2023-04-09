import { FaArrowUp } from "react-icons/fa";
import styles from "./UpButton.module.scss";

interface UpButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isVisible: boolean;
}

const UpButton: React.FC<UpButtonProps> = ({ isVisible, ...restProps }) => {
  return (
    <button
      className={`${styles.button} ${isVisible ? styles.hidden : ""}`}
      {...restProps}
    >
      <FaArrowUp />
    </button>
  );
};

export default UpButton;
