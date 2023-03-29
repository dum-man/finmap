import { t } from "i18next";
import { AiOutlineMenu } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import { Account } from "../../../../types";
import styles from "./AccountItem.module.scss";

interface AccountItemProps {
  account: Account;
}

const AccountItem: React.FC<AccountItemProps> = ({ account }) => {
  return (
    <li className={styles.account}>
      <div className={styles.wrapper}>
        <AiOutlineMenu className={styles.icon} />
        <BsCurrencyDollar className={styles.icon} />
        {account.group === "base" ? t(account.name) : account.name}
      </div>
    </li>
  );
};

export default AccountItem;
