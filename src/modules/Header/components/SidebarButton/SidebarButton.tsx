import { useDispatch, useSelector } from "react-redux";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { RootState } from "app/store";
import { toggleSidebarOpen } from "app/slices/appSlice";
import styles from "./SidebarButton.module.scss";

const SidebarButton: React.FC = () => {
  const sidebarOpen = useSelector((state: RootState) => state.app.sidebarOpen);

  const dispatch = useDispatch();

  return (
    <button className={styles.button} onClick={() => dispatch(toggleSidebarOpen())}>
      {sidebarOpen ? <RiMenuFoldLine /> : <RiMenuUnfoldLine />}
    </button>
  );
};

export default SidebarButton;
