import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { Dropdown } from "ui";
import { toggleSettingsMenuOpen } from "app/slices/appSlice";
import AccountItems from "../AccountItems/AccountItems";
import SettingsHeader from "../SettingsHeader/SettingsHeader";
import SettingsItems from "../SettingsItems/SettingsItems";
import styles from "./SettingsMenu.module.css";

const animation = {
  enter: styles["animation-enter"],
  enterActive: styles["animation-enter-active"],
  exit: styles["animation-exit"],
  exitActive: styles["animation-exit-active"],
};

const SettingsMenu: React.FC = () => {
  const dispatch = useAppDispatch();

  const settingsMenuOpen = useAppSelector((state) => state.app.settingsMenuOpen);

  const handleClose = () => {
    dispatch(toggleSettingsMenuOpen(false));
  };

  return (
    <Dropdown
      isOpen={settingsMenuOpen}
      onClose={handleClose}
      className={styles["container"]}
      animation={animation}
    >
      <div className={styles["wrapper"]}>
        <SettingsHeader />
        <div className={styles["menu-wrapper"]}>
          <AccountItems />
          <SettingsItems />
        </div>
      </div>
    </Dropdown>
  );
};

export default SettingsMenu;
