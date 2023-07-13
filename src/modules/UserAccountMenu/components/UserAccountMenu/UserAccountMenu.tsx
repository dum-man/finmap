import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import { SlidingMenu } from "layouts";
import AccountType from "../AccountType/AccountType";
import EditAccountButton from "../EditAccountButton/EditAccountButton";
import { toggleUserAccountMenuOpen } from "app/slices/appSlice";
import { VARIANTS } from "../../constants";
import styles from "./UserAccountMenu.module.scss";

const UserAccountMenu: React.FC = () => {
  const dispatch = useAppDispatch();

  const userAccountMenuOpen = useAppSelector((state) => state.app.userAccountMenuOpen);

  const handleClose = () => {
    dispatch(toggleUserAccountMenuOpen(false));
  };

  return (
    <SlidingMenu
      open={userAccountMenuOpen}
      onClose={handleClose}
      variants={VARIANTS}
      className={styles.menuContainer}
    >
      <AccountType />
      <span className={styles.divider} />
      <EditAccountButton />
    </SlidingMenu>
  );
};

export default UserAccountMenu;
