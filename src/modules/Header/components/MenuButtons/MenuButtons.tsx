import { useDispatch } from "react-redux";
import { IoSettingsOutline } from "react-icons/io5";
import { RiExchangeLine } from "react-icons/ri";
import {
  toggleSettingsMenuOpen,
  toggleTransfersMeunOpen,
} from "../../../../app/slices/appSlice";
import styles from "./MenuButtons.module.scss";

const MenuButtons: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <ul className={styles.menuButtons}>
      <li>
        <button
          className={styles.button}
          onClick={() => dispatch(toggleTransfersMeunOpen(true))}
        >
          <RiExchangeLine />
        </button>
      </li>
      <li>
        <button
          className={styles.button}
          onClick={() => dispatch(toggleSettingsMenuOpen(true))}
        >
          <IoSettingsOutline />
        </button>
      </li>
    </ul>
  );
};

export default MenuButtons;
