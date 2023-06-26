import { useAuthState } from "react-firebase-hooks/auth";
import AccountItem from "../AccountItem/AccountItem";
import { auth } from "../../../../firebase";
import { useGetAccountsQuery } from "../../../../app/services/accountApi";
import styles from "./AccountsList.module.scss";

const AccountsList: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const { data: accounts = [] } = useGetAccountsQuery(currentUser?.uid as string);

  return (
    <ul className={styles.list}>
      {accounts.map((account) => (
        <AccountItem key={account.id} account={account} />
      ))}
    </ul>
  );
};

export default AccountsList;
