import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import classNames from "classnames";
import useAppSelector from "hooks/useAppSelector";
import { useGetAccountsQuery } from "app/services/accountApi";
import { auth } from "app/config";
import { CURRENCY_OPTIONS } from "app/constants";
import { Select } from "ui";
import { SelectOption } from "types";
import TotalAmount from "../TotalAmount/TotalAmount";
import Accounts from "../Accounts/Accounts";
import AccountButtons from "../AccountButtons/AccountButtons";
import SelectedAccounts from "../SelectedAccounts/SelectedAccounts";
import Skeleton from "../Skeleton/Skeleton";
import { formatSelectOption } from "../../helpers";
import styles from "./Sidebar.module.css";

const Sidebar: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const { data: accounts = [], isLoading } = useGetAccountsQuery({
    userId: currentUser?.uid!,
  });

  const sidebarOpen = useAppSelector((state) => state.app.sidebarOpen);

  const [selectedCurrency, setSelectedCurrency] = useState<SelectOption>(() =>
    formatSelectOption(CURRENCY_OPTIONS[0])
  );

  const handleSetSelectedCurrency = (option: SelectOption) => {
    setSelectedCurrency(formatSelectOption(option));
  };

  return (
    <section
      className={classNames(styles["container"], {
        [styles["open"]]: sidebarOpen,
        [styles["close"]]: !sidebarOpen,
      })}
    >
      <TotalAmount currencyCode={selectedCurrency.id}>
        <Select
          value={selectedCurrency}
          onChange={handleSetSelectedCurrency}
          options={CURRENCY_OPTIONS}
          position="left"
        />
      </TotalAmount>
      <AccountButtons />
      {isLoading ? <Skeleton /> : <Accounts accounts={accounts} />}
      <SelectedAccounts />
    </section>
  );
};

export default Sidebar;
