import { useAuthState } from "react-firebase-hooks/auth";
import { useGetTransfersQuery } from "app/services/transferApi";
import { auth } from "app/config";
import { Loader } from "ui";
import NotFound from "../NotFound/NotFound";
import TransferItem from "../TransferItem/TransferItem";
import styles from "./TransfersList.module.css";

const TransfersList: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const { data: transfers = [], isLoading } = useGetTransfersQuery({
    userId: currentUser?.uid!,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!transfers.length) {
    return <NotFound />;
  }

  return (
    <ul className={styles["transfers-list"]}>
      {transfers.map((transfer) => (
        <TransferItem key={transfer.id} transfer={transfer} />
      ))}
    </ul>
  );
};

export default TransfersList;
