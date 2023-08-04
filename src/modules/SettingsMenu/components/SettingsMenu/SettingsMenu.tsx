import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { Dropdown } from "ui";
import { toggleSettingsMenuOpen } from "app/slices/appSlice";
import AccountItems from "../AccountItems/AccountItems";
import SettingsHeader from "../SettingsHeader/SettingsHeader";
import SettingsItems from "../SettingsItems/SettingsItems";
import styles from "./SettingsMenu.module.scss";

const animation = {
  enter: styles.animationEnter,
  enterActive: styles.animationEnterActive,
  exit: styles.animationExit,
  exitActive: styles.animationExitActive,
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
      className={styles.container}
      animation={animation}
    >
      <div className={styles.wrapper}>
        <SettingsHeader />
        <div className={styles.menuWrapper}>
          <AccountItems />
          <SettingsItems />
        </div>
      </div>
    </Dropdown>
  );
};

export default SettingsMenu;
