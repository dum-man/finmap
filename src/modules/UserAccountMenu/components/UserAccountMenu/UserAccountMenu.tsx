import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import { toggleUserAccountMenuOpen } from "app/slices/appSlice";
import { Dropdown } from "ui";
import AccountType from "../AccountType/AccountType";
import EditAccountButton from "../EditAccountButton/EditAccountButton";
import styles from "./UserAccountMenu.module.scss";

const animation = {
  enter: styles.animationEnter,
  enterActive: styles.animationEnterActive,
  exit: styles.animationExit,
  exitActive: styles.animationExitActive,
};

const UserAccountMenu: React.FC = () => {
  const dispatch = useAppDispatch();

  const userAccountMenuOpen = useAppSelector((state) => state.app.userAccountMenuOpen);

  const handleClose = () => {
    dispatch(toggleUserAccountMenuOpen(false));
  };

  return (
    <Dropdown
      isOpen={userAccountMenuOpen}
      onClose={handleClose}
      className={styles.container}
      animation={animation}
    >
      <div className={styles.wrapper}>
        <AccountType />
        <span className={styles.divider} />
        <EditAccountButton />
      </div>
    </Dropdown>
  );
};

export default UserAccountMenu;
