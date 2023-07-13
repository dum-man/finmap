import { useTranslation } from "react-i18next";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { SlidingMenu } from "layouts";
import { CloseButton } from "ui";
import Transfers from "../Transfers/Transfers";
import { toggleTransfersMeunOpen } from "app/slices/appSlice";
import styles from "./TransfersMenu.module.scss";

const TransfersMenu: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const transfersMeunOpen = useAppSelector((state) => state.app.transfersMeunOpen);

  const handleClose = () => {
    dispatch(toggleTransfersMeunOpen(false));
  };

  return (
    <SlidingMenu
      open={transfersMeunOpen}
      onClose={handleClose}
      className={styles.menuContainer}
    >
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{t("transfers")}</h2>
        <CloseButton onClick={handleClose} />
        <Transfers />
      </div>
    </SlidingMenu>
  );
};

export default TransfersMenu;
