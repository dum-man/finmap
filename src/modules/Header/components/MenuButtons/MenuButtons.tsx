import { MutableRefObject } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { RiExchangeLine } from "react-icons/ri";
import styles from "./MenuButtons.module.scss";

interface MenuButtonsProps {
  transfersMenuRef: MutableRefObject<null>;
  setTransfersMenuOpen: (open: React.SetStateAction<boolean>) => void;
  settingsMenuRef: MutableRefObject<null>;
  setSettingsMenuOpen: (open: React.SetStateAction<boolean>) => void;
}

const MenuButtons: React.FC<MenuButtonsProps> = ({
  transfersMenuRef,
  setTransfersMenuOpen,
  settingsMenuRef,
  setSettingsMenuOpen,
}) => {
  return (
    <ul className={styles.buttonsList}>
      <li>
        <button
          className={styles.button}
          ref={transfersMenuRef}
          onClick={() => setTransfersMenuOpen((prev) => !prev)}
        >
          <RiExchangeLine />
        </button>
      </li>
      <li>
        <button
          className={styles.button}
          ref={settingsMenuRef}
          onClick={() => setSettingsMenuOpen((prev) => !prev)}
        >
          <IoSettingsOutline />
        </button>
      </li>
    </ul>
  );
};

export default MenuButtons;
