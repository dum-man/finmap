import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { BiTransferAlt } from "react-icons/bi";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { useCancelTransferMutation } from "../../../../app/services/transferApi";
import { setFormattedDateTime } from "../../../../utils";
import { setFormattedAmount } from "../../../../utils/setFormattedAmount";
import { auth } from "../../../../firebase";
import { Transfer } from "../../../../types";
import styles from "./Transfers.module.scss";

interface TransfersProps {
  transfers: Transfer[];
}

const Transfers: React.FC<TransfersProps> = ({ transfers }) => {
  const { t } = useTranslation();

  const [currentUser] = useAuthState(auth);

  const [cancelTransfer, { isLoading }] = useCancelTransferMutation();

  const onCancelTransfer = async (userId: string, transfer: Transfer) => {
    try {
      await cancelTransfer({ userId, transfer }).unwrap();
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
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
              disabled={isLoading}
              onClick={() => onCancelTransfer(currentUser?.uid as string, transfer)}
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
