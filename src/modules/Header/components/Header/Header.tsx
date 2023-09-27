import MenuButtons from "../MenuButtons/MenuButtons";
import SidebarButton from "../SidebarButton/SidebarButton";
import TransactionButtons from "../TransactionButtons/TransactionButtons";
import UserInfo from "../UserInfo/UserInfo";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles["wrapper"]}>
      <SidebarButton />
      <UserInfo />
      <TransactionButtons />
      <MenuButtons />
    </header>
  );
};

export default Header;
