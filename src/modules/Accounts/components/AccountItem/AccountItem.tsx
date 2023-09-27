import { SetStateAction } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { t } from "i18next";
import classNames from "classnames";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { useDeleteAccountMutation } from "app/services/accountApi";
import { auth } from "app/config";
import { setCurrencySymbol } from "utils/sumUtils";
import { Spinner } from "ui";
import { Account } from "types";
import styles from "./AccountItem.module.css";

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
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast(error.message);
      }
    }
  };

  return (
    <li className={styles["account-item"]}>
      <div className={styles["account-wrapper"]}>
        <span className={styles["currency"]}>{setCurrencySymbol(account.currency)}</span>
        <p>{account.group === "base" ? t(account.name) : account.name}</p>
        {account.id === accountToDeleteId ? (
          <div className={styles["buttons"]}>
            {!isLoading ? (
              <button
                className={classNames(
                  "icon-button",
                  styles["icon-button"],
                  styles["delete-button"]
                )}
                onClick={handleDeleteAccount}
              >
                <AiOutlineDelete />
              </button>
            ) : (
              <Spinner variant="dark" />
            )}
            <button
              className={classNames("icon-button", styles["icon-button"])}
              onClick={() => setAccountToDelete(null)}
            >
              <IoClose />
            </button>
          </div>
        ) : (
          <button
            className={classNames("icon-button", styles["icon-button"])}
            type="button"
            onClick={() => setAccountToDelete(account)}
          >
            <BiEditAlt />
          </button>
        )}
      </div>
    </li>
  );
};

export default AccountItem;
