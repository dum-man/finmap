import FocusTrap from "focus-trap-react";
import { CloseButton, Popup } from "ui";
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
          <CloseButton onClick={onClose} />
          {children}
        </div>
      </FocusTrap>
    </Popup>
  );
};

export default MainPopup;
