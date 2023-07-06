import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { motion } from "framer-motion";
import { Select } from "ui";
import { auth } from "app/config";
import { useGetAccountsQuery } from "app/services/accountApi";
import { INPUT_LABEL_VARIANTS } from "app/constants";
import { SelectOption } from "types";
import styles from "./AccountSelect.module.scss";

interface AccountSelectProps {
  placeholder: string;
  value: SelectOption | null;
  onChange: (option: SelectOption) => void;
}

const AccountSelect: React.FC<AccountSelectProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  const [currentUser] = useAuthState(auth);

  const { data: accounts = [] } = useGetAccountsQuery(currentUser?.uid as string);

  const accountOptions = useMemo(
    () =>
      accounts.map((account) => ({
        id: account.id,
        group: account.group,
        label: account.name,
      })),
    [accounts]
  );

  return (
    <div className={styles.wrapper}>
      <Select
        placeholder={placeholder}
        active={!!value}
        value={value}
        options={accountOptions}
        onChange={onChange}
      />

      {!!value && (
        <motion.span
          className={styles.label}
          variants={INPUT_LABEL_VARIANTS}
          initial="hidden"
          animate="visible"
        >
          {placeholder}
        </motion.span>
      )}
    </div>
  );
};

export default AccountSelect;
