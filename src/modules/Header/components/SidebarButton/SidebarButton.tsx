import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { toggleSidebarOpen } from "app/slices/appSlice";
import styles from "./SidebarButton.module.scss";

const SidebarButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const sidebarOpen = useAppSelector((state) => state.app.sidebarOpen);

  return (
    <button className={styles.button} onClick={() => dispatch(toggleSidebarOpen())}>
      {sidebarOpen ? <RiMenuFoldLine /> : <RiMenuUnfoldLine />}
    </button>
  );
};

export default SidebarButton;
