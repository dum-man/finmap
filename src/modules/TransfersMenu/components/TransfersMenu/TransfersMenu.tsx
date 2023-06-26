import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { SlidingMenu } from "../../../../layouts";
import { CloseButton } from "../../../../ui";
import Transfers from "../Transfers/Transfers";
import NotFound from "../NotFound/NotFound";
import Skeleton from "../Skeleton/Skeleton";
import { useGetTransfersQuery } from "../../../../app/services/transferApi";
import { auth } from "../../../../firebase";
import { RootState } from "../../../../app/store";
import { toggleTransfersMeunOpen } from "../../../../app/slices/appSlice";
import styles from "./TransfersMenu.module.scss";

const TransfersMenu: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const { data: transfers = [], isLoading } = useGetTransfersQuery(
    currentUser?.uid as string
  );

  const { transfersMeunOpen } = useSelector((state: RootState) => state.app);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleTransfersMeunOpen(false));
  };

  return (
    <SlidingMenu
      open={transfersMeunOpen}
      onClose={handleClose}
      className={styles.container}
    >
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{t("transfers")}</h2>
        <CloseButton onClick={handleClose} />
        {isLoading ? (
          <Skeleton />
        ) : (
          <>{transfers.length ? <Transfers transfers={transfers} /> : <NotFound />}</>
        )}
      </div>
    </SlidingMenu>
  );
};

export default TransfersMenu;
