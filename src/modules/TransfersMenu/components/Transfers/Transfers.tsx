import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { BiTransferAlt } from "react-icons/bi";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { setFormattedDateTime } from "../../../../utils";
import { setFormattedAmount } from "../../../../utils/setFormattedAmount";
import { cancelTransfer } from "../../api";
import { accountsState } from "../../../../app/atoms/accountsAtom";
import { transfersState } from "../../../../app/atoms/transfersAtom";
import { auth } from "../../../../firebase";
import { Transfer } from "../../../../types";
import styles from "./Transfers.module.scss";

const Transfers: React.FC = () => {
  const { t } = useTranslation();

  const [currentUser] = useAuthState(auth);

  const [{ transfers }, setTransfersStateValue] = useRecoilState(transfersState);
  const [{ accounts }, setAccountsStateValue] = useRecoilState(accountsState);

  const [transferCanceling, setTransferCanceling] = useState(false);

  const onCancelTransfer = async (transfer: Transfer) => {
    const fromAccount = accounts.find(
      (account) => account.id === transfer.fromAccount.id
    );
    const toAccount = accounts.find((account) => account.id === transfer.toAccount.id);

    if (!fromAccount || !toAccount) {
      toast.error(t("accountNotExist"));
      return;
    }
    if (toAccount?.balance - transfer.amount < 0) {
      toast.error(t("insufficientFunds"));
      return;
    }
    setTransferCanceling(true);

    try {
      await cancelTransfer(currentUser?.uid, transfer);
      setTransfersStateValue((prev) => ({
        ...prev,
        transfers: prev.transfers.filter((item) => item.id !== transfer.id),
      }));
      setAccountsStateValue((prev) => {
        const updatedAccounts = [...prev.accounts];
        const fromUpdatedAccountIndex = updatedAccounts.findIndex(
          (account) => account.id === transfer.fromAccount.id
        );
        const toUpdatedAccountIndex = updatedAccounts.findIndex(
          (account) => account.id === transfer.toAccount.id
        );

        const fromUpdatedAccount = updatedAccounts[fromUpdatedAccountIndex];
        const toUpdatedAccount = updatedAccounts[toUpdatedAccountIndex];

        updatedAccounts[fromUpdatedAccountIndex] = {
          ...fromUpdatedAccount,
          balance: fromUpdatedAccount.balance + transfer.amount,
        };
        updatedAccounts[toUpdatedAccountIndex] = {
          ...toUpdatedAccount,
          balance: toUpdatedAccount.balance - transfer.amount,
        };
        return {
          ...prev,
          accounts: updatedAccounts,
        };
      });
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    setTransferCanceling(false);
  };

  return (
    <ul className={styles.transfersList}>
      <AnimatePresence>
        {transfers.map((transfer) => (
          <motion.li
            key={transfer.id}
            className={styles.transferItem}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.icon}>
              <BiTransferAlt />
            </div>
            <div>
              <p className={styles.amount}>{setFormattedAmount(transfer.amount)}</p>
              <p className={styles.accounts}>
                {transfer.fromAccount.name}
                <MdOutlineArrowRightAlt size={20} />
                {transfer.toAccount.name}
              </p>
              <p className={styles.date}>
                {setFormattedDateTime(transfer.createdAt.toDate())}
              </p>
            </div>
            <button
              className={styles.cancelButton}
              disabled={transferCanceling}
              onClick={() => onCancelTransfer(transfer)}
            >
              {t("cancel")}
            </button>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default Transfers;
