import { useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import classNames from "classnames";
import TotalAmount from "../TotalAmount/TotalAmount";
import Accounts from "../Accounts/Accounts";
import AccountButtons from "../AccountButtons/AccountButtons";
import SelectedAccounts from "../SelectedAccounts/SelectedAccounts";
import Skeleton from "../Skeleton/Skeleton";
import { useGetAccountsQuery } from "../../../../app/services/accountApi";
import { auth } from "../../../../firebase";
import { RootState } from "../../../../app/store";
import styles from "./Sidebar.module.scss";

const Sidebar: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const { sidebarOpen } = useSelector((state: RootState) => state.app);

  const { data: accounts = [], isLoading } = useGetAccountsQuery(
    currentUser?.uid as string
  );

  const totalAmount = accounts
    ? accounts.reduce((acc, current) => acc + current.balance, 0)
    : 0;

  return (
    <section
      className={classNames(styles.container, {
        [styles.open]: sidebarOpen,
        [styles.close]: !sidebarOpen,
      })}
    >
      <TotalAmount totalAmount={totalAmount} />
      <AccountButtons />
      {isLoading ? <Skeleton /> : <Accounts accounts={accounts} />}
      <SelectedAccounts />
    </section>
  );
};

export default Sidebar;
