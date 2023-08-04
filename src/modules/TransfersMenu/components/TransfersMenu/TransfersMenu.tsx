import { useTranslation } from "react-i18next";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { toggleTransfersMeunOpen } from "app/slices/appSlice";
import { Dropdown, CloseButton } from "ui";
import Transfers from "../Transfers/Transfers";
import styles from "./TransfersMenu.module.scss";

const animation = {
  enter: styles.animationEnter,
  enterActive: styles.animationEnterActive,
  exit: styles.animationExit,
  exitActive: styles.animationExitActive,
};

const TransfersMenu: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const transfersMeunOpen = useAppSelector((state) => state.app.transfersMeunOpen);

  const handleClose = () => {
    dispatch(toggleTransfersMeunOpen(false));
  };

  return (
    <Dropdown
      isOpen={transfersMeunOpen}
      onClose={handleClose}
      className={styles.container}
      animation={animation}
    >
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{t("transfers")}</h2>
        <CloseButton onClick={handleClose} />
        <Transfers />
      </div>
    </Dropdown>
  );
};

export default TransfersMenu;
