import FocusTrap from "focus-trap-react";
import { IoClose } from "react-icons/io5";
import { Popup } from "ui";
import styles from "./MainPopup.module.scss";

interface MainPopupProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const MainPopup: React.FC<MainPopupProps> = ({ title, isOpen, onClose, children }) => {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <FocusTrap
        focusTrapOptions={{
          onDeactivate: onClose,
          allowOutsideClick: true,
        }}
      >
        <div className={styles.container}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.button} type="button" onClick={onClose}>
            <IoClose />
            <span className="visually-hidden">Close</span>
          </button>
          {children}
        </div>
      </FocusTrap>
    </Popup>
  );
};

export default MainPopup;
