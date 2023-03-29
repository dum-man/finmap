import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import useAppContext from "../../../../hooks/useAppContext";
import styles from "./SidebarButton.module.scss";

const SidebarButton: React.FC = () => {
  const { sidebarOpen, setSidebarOpen } = useAppContext();

  return (
    <button className={styles.button} onClick={() => setSidebarOpen((prev) => !prev)}>
      {sidebarOpen ? <RiMenuFoldLine /> : <RiMenuUnfoldLine />}
    </button>
  );
};

export default SidebarButton;
