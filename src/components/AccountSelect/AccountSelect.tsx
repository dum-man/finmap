import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Select } from "ui";
import { auth } from "app/config";
import { useGetAccountsQuery } from "app/services/accountApi";
import { SelectOption } from "types";
import styles from "./AccountSelect.module.css";

interface AccountSelectProps {
  label: string;
  value: SelectOption | null;
  onChange: (option: SelectOption) => void;
}

const AccountSelect: React.FC<AccountSelectProps> = ({ label, value, onChange }) => {
  const [currentUser] = useAuthState(auth);

  const { data: accounts = [] } = useGetAccountsQuery({
    userId: currentUser?.uid!,
  });

  const accountOptions = useMemo(
    () =>
      accounts.map((account) => ({
        id: account.id,
        label: account.name,
        group: account.group,
        currency: account.currency,
      })),
    [accounts]
  );

  return (
    <div className={styles["wrapper"]}>
      <Select label={label} value={value} options={accountOptions} onChange={onChange} />
    </div>
  );
};

export default AccountSelect;
