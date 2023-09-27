import { BiTransferAlt } from "react-icons/bi";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { setFormattedAmount } from "utils/sumUtils/setFormattedAmount";
import { setFormattedDate, setFormattedTime } from "utils/dateUtils";
import { Transfer } from "types";
import styles from "./TransferItem.module.css";

interface TransferItemProps {
  transfer: Transfer;
}

const TransferItem: React.FC<TransferItemProps> = ({ transfer }) => {
  return (
    <li className={styles["transfer-item"]}>
      <div className={styles["icon"]}>
        <BiTransferAlt />
      </div>
      <div>
        <p className={styles["amount"]}>
          {setFormattedAmount(transfer.amount, transfer.fromAccount.currency)}
        </p>
        <p className={styles["accounts"]}>
          {transfer.fromAccount.name}
          <MdOutlineArrowRightAlt size={20} />
          {transfer.toAccount.name}
        </p>
      </div>
      <div className={styles["date"]}>
        <span>{setFormattedDate(transfer.createdAt.toDate())}</span>
        <span>{setFormattedTime(transfer.createdAt.toDate())}</span>
      </div>
    </li>
  );
};

export default TransferItem;
