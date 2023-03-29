import { IoClose } from "react-icons/io5";
import styles from "./CloseButton.module.scss";

interface CloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CloseButton: React.FC<CloseButtonProps> = (props) => {
  return (
    <button className={styles.button} type="button" {...props}>
      <IoClose />
      <span className="visually-hidden">Close</span>
    </button>
  );
};

export default CloseButton;
