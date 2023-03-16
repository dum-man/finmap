import { MutableRefObject, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { BiTransferAlt } from "react-icons/bi";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import CloseButton from "../../UI/CloseButton/CloseButton";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { cancelTransfer } from "../../../app/service/transfersService";
import { auth } from "../../../app/firebase";
import { accountsState } from "../../../app/atoms/accountsAtom";
import { transfersState } from "../../../app/atoms/transfersAtom";
import { setFormattedAmount } from "../../../utils";
import { setFormattedDateTime } from "../../../utils/dateUtils";
import { MENU_VARIANTS } from "../../../app/constants";
import { Transfer } from "../../../types";
import notFoundImage from "../../../assets/images/not-found.svg";
import styles from "./Popover.module.scss";

interface TransfersProps {
  setOpen: (open: boolean) => void;
  parentRef: MutableRefObject<null> | null;
}

const Transfers: React.FC<TransfersProps> = ({ setOpen, parentRef }) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const [{ transfers }, setTransfersStateValue] = useRecoilState(transfersState);
  const [{ accounts }, setAccountsStateValue] = useRecoilState(accountsState);

  const [transferCanceling, setTransferCanceling] = useState(false);

  const containerRef = useRef(null);

  const handleClickOutside = () => {
    setOpen(false);
  };

  useOnClickOutside(containerRef, parentRef, handleClickOutside);

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
    <motion.div
      className={styles.container}
      variants={MENU_VARIANTS}
      initial="hidden"
      animate="visible"
      exit="exit"
      ref={containerRef}
    >
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{t("transfers")}</h2>
        <CloseButton onClose={() => setOpen(false)} />
        {transfers.length ? (
          <ul className={styles.transferList}>
            <AnimatePresence>
              {transfers.map((transfer) => (
                <motion.li
                  key={transfer.id}
                  className={styles.transferItem}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.iconWrapper}>
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
        ) : (
          <div className={styles.notFound}>
            <img src={notFoundImage} alt="sun and sea" />
            <p>{t("transfersNotFound")}</p>
            <p>{t("transfersNotFoundMessage")}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Transfers;
