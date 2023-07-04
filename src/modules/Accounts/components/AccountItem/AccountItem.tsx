import { SetStateAction } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { t } from "i18next";
import { motion } from "framer-motion";
import classNames from "classnames";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { useDeleteAccountMutation } from "app/services/accountApi";
import { auth } from "app/config";
import { Spinner } from "ui";
import { ACCOUNT_ITEM_VARIANTS, BUTTON_VARIANTS } from "../../constants";
import { Account } from "types";
import styles from "./AccountItem.module.scss";

interface AccountItemProps {
  account: Account;
  accountToDeleteId: string | undefined;
  setAccountToDelete: (account: SetStateAction<Account | null>) => void;
}

const AccountItem: React.FC<AccountItemProps> = ({
  account,
  accountToDeleteId,
  setAccountToDelete,
}) => {
  const [currentUser] = useAuthState(auth);

  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();

  const handleDeleteAccount = async () => {
    if (!currentUser) {
      return;
    }
    if (!accountToDeleteId) {
      toast.error(t("accountSelectedError"));
      return;
    }
    try {
      await deleteAccount({
        userId: currentUser.uid,
        accountId: accountToDeleteId,
      }).unwrap();
      setAccountToDelete(null);
    } catch (error: any) {
      console.log(error.message);
      toast(error.message);
    }
  };

  return (
    <motion.li
      className={styles.accountItem}
      variants={ACCOUNT_ITEM_VARIANTS}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className={styles.wrapper}>
        <BsCurrencyDollar className={styles.icon} />
        <p>{account.group === "base" ? t(account.name) : account.name}</p>
        {account.id === accountToDeleteId ? (
          <motion.div
            className={styles.buttons}
            variants={BUTTON_VARIANTS}
            initial="hidden"
            animate="visible"
          >
            {!isLoading ? (
              <button
                className={classNames(styles.button, styles.deleteButton)}
                onClick={handleDeleteAccount}
              >
                <AiOutlineDelete />
              </button>
            ) : (
              <Spinner variant="dark" />
            )}
            <button className={styles.button} onClick={() => setAccountToDelete(null)}>
              <IoClose />
            </button>
          </motion.div>
        ) : (
          <motion.button
            className={styles.button}
            type="button"
            variants={BUTTON_VARIANTS}
            initial="hidden"
            animate="visible"
            onClick={() => setAccountToDelete(account)}
          >
            <BiEditAlt />
          </motion.button>
        )}
      </div>
    </motion.li>
  );
};

export default AccountItem;
