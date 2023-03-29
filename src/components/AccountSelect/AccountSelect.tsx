import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { motion } from "framer-motion";
import { Select } from "../../ui";
import { accountsState } from "../../app/atoms/accountsAtom";
import { INPUT_LABEL_VARIANTS } from "../../app/constants";
import { SelectOption } from "../../types";
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
  const { accounts } = useRecoilValue(accountsState);

  const accountOptions = useMemo(() => {
    return accounts.map((account) => ({
      id: account.id,
      group: account.group,
      label: account.name,
    }));
  }, [accounts]);

  return (
    <div className={styles.inputWrapper}>
      <Select
        placeholder={placeholder}
        active={!!value}
        value={value}
        options={accountOptions}
        onChange={onChange}
      />
      {value && (
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
