import { IoSettingsOutline } from "react-icons/io5";
import { RiExchangeLine } from "react-icons/ri";
import useAppDispatch from "hooks/useAppDispatch";
import { toggleSettingsMenuOpen, toggleTransfersMenuOpen } from "app/slices/appSlice";
import styles from "./MenuButtons.module.css";

const MenuButtons: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <ul className={styles["menu-buttons"]}>
      <li>
        <button
          className={styles["button"]}
          onClick={() => dispatch(toggleTransfersMenuOpen(true))}
        >
          <RiExchangeLine />
        </button>
      </li>
      <li>
        <button
          className={styles["button"]}
          onClick={() => dispatch(toggleSettingsMenuOpen(true))}
        >
          <IoSettingsOutline />
        </button>
      </li>
    </ul>
  );
};

export default MenuButtons;
