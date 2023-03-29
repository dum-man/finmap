import AccountButtons from "../AccountButtons/AccountButtons";
import Accounts from "../Accounts/Accounts";
import SelectedAccounts from "../SelectedAccounts/SelectedAccounts";
import TotalAmount from "../TotalAmount/TotalAmount";
import useAppContext from "../../../../hooks/useAppContext";
import styles from "./Sidebar.module.scss";

interface SidebarProps {
  setCreateAccountOpen: (open: React.SetStateAction<boolean>) => void;
  setDeleteAccountOpen: (open: React.SetStateAction<boolean>) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  setCreateAccountOpen,
  setDeleteAccountOpen,
}) => {
  const { sidebarOpen } = useAppContext();

  return (
    <section
      className={`${styles.container} ${sidebarOpen ? styles.open : styles.close}`}
    >
      <TotalAmount />
      <AccountButtons
        setCreateAccountOpen={setCreateAccountOpen}
        setDeleteAccountOpen={setDeleteAccountOpen}
      />
      <Accounts />
      <SelectedAccounts />
    </section>
  );
};

export default Sidebar;
