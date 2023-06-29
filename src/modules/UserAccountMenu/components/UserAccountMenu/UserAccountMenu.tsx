import { useDispatch, useSelector } from "react-redux";
import { SlidingMenu } from "layouts";
import AccountType from "../AccountType/AccountType";
import EditAccountButton from "../EditAccountButton/EditAccountButton";
import { toggleUserAccountMenuOpen } from "app/slices/appSlice";
import { RootState } from "app/store";
import { VARIANTS } from "../../constants";
import styles from "./UserAccountMenu.module.scss";

const UserAccountMenu: React.FC = () => {
  const dispatch = useDispatch();

  const { userAccountMenuOpen } = useSelector((state: RootState) => state.app);

  const handleClose = () => {
    dispatch(toggleUserAccountMenuOpen(false));
  };

  return (
    <SlidingMenu
      open={userAccountMenuOpen}
      onClose={handleClose}
      variants={VARIANTS}
      className={styles.container}
    >
      <AccountType />
      <span className={styles.divider} />
      <EditAccountButton />
    </SlidingMenu>
  );
};

export default UserAccountMenu;
