import { useRef } from "react";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { SlidingMenu } from "layouts";
import AccountItems from "../AccountItems/AccountItems";
import SettingsHeader from "../SettingsHeader/SettingsHeader";
import SettingsItems from "../SettingsItems/SettingsItems";
import useOnClickOutside from "hooks/useClickOutside";
import { toggleSettingsMenuOpen } from "app/slices/appSlice";
import styles from "./SettingsMenu.module.scss";

const SettingsMenu: React.FC = () => {
  const containerRef = useRef(null);

  const dispatch = useAppDispatch();

  const settingsMenuOpen = useAppSelector((state) => state.app.settingsMenuOpen);

  const handleClose = () => {
    dispatch(toggleSettingsMenuOpen(false));
  };

  useOnClickOutside(containerRef, handleClose);

  return (
    <SlidingMenu
      open={settingsMenuOpen}
      onClose={handleClose}
      className={styles.menuContainer}
    >
      <div className={styles.wrapper}>
        <SettingsHeader />
        <div className={styles.menuWrapper}>
          <AccountItems />
          <SettingsItems />
        </div>
      </div>
    </SlidingMenu>
  );
};

export default SettingsMenu;
