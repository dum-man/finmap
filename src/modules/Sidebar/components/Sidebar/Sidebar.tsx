import { useAuthState } from "react-firebase-hooks/auth";
import TotalAmount from "../TotalAmount/TotalAmount";
import Accounts from "../Accounts/Accounts";
import AccountButtons from "../AccountButtons/AccountButtons";
import SelectedAccounts from "../SelectedAccounts/SelectedAccounts";
import Skeleton from "../Skeleton/Skeleton";
import useAppContext from "../../../../hooks/useAppContext";
import { useGetAccountsQuery } from "../../../../app/services/accountApi";
import { auth } from "../../../../firebase";
import styles from "./Sidebar.module.scss";

interface SidebarProps {
  setCreateAccountOpen: (open: React.SetStateAction<boolean>) => void;
  setDeleteAccountOpen: (open: React.SetStateAction<boolean>) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  setCreateAccountOpen,
  setDeleteAccountOpen,
}) => {
  const [currentUser] = useAuthState(auth);

  const { sidebarOpen } = useAppContext();

  const {
    data: accounts = [],
    isLoading,
    isError,
    isSuccess,
  } = useGetAccountsQuery(currentUser?.uid as string);

  const totalAmount = accounts
    ? accounts.reduce((acc, current) => acc + current.balance, 0)
    : 0;

  let contnet;

  if (isLoading) {
    contnet = <Skeleton />;
  } else if (isError) {
    contnet = <div>error</div>;
  } else if (isSuccess) {
    contnet = <Accounts accounts={accounts} />;
  }

  return (
    <section
      className={`${styles.container} ${sidebarOpen ? styles.open : styles.close}`}
    >
      <TotalAmount totalAmount={totalAmount} />
      <AccountButtons
        setCreateAccountOpen={setCreateAccountOpen}
        setDeleteAccountOpen={setDeleteAccountOpen}
      />
      {contnet}
      <SelectedAccounts />
    </section>
  );
};

export default Sidebar;
