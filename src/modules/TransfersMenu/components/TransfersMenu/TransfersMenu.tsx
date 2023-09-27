import { useTranslation } from "react-i18next";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { toggleTransfersMenuOpen } from "app/slices/appSlice";
import { Dropdown, CloseButton } from "ui";
import TransfersList from "../TransfersList/TransfersList";
import styles from "./TransfersMenu.module.css";

const animation = {
  enter: styles["animation-enter"],
  enterActive: styles["animation-enter-active"],
  exit: styles["animation-exit"],
  exitActive: styles["animation-exit-active"],
};

const TransfersMenu: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const transfersMenuOpen = useAppSelector((state) => state.app.transfersMenuOpen);

  const handleClose = () => {
    dispatch(toggleTransfersMenuOpen(false));
  };

  return (
    <Dropdown
      isOpen={transfersMenuOpen}
      onClose={handleClose}
      className={styles["container"]}
      animation={animation}
    >
      <div className={styles["wrapper"]}>
        <h2 className={styles["title"]}>{t("transfers")}</h2>
        <CloseButton onClick={handleClose} />
        <TransfersList />
      </div>
    </Dropdown>
  );
};

export default TransfersMenu;
