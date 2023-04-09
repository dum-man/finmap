import { MutableRefObject, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { CloseButton } from "../../../../ui";
import Transfers from "../Transfers/Transfers";
import NotFound from "../NotFound/NotFound";
import Skeleton from "../Skeleton/Skeleton";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";
import { useGetTransfersQuery } from "../../../../app/services/transferApi";
import { auth } from "../../../../firebase";
import { MENU_VARIANTS } from "../../../../app/constants";
import styles from "./TransfersMenu.module.scss";

interface TransfersMenuProps {
  onClose: () => void;
  parentRef: MutableRefObject<null> | null;
}

const TransfersMenu: React.FC<TransfersMenuProps> = ({ onClose, parentRef }) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const {
    data: transfers = [],
    isLoading,
    isError,
    isSuccess,
  } = useGetTransfersQuery(currentUser?.uid as string);

  const containerRef = useRef(null);

  useOnClickOutside(containerRef, parentRef, onClose);

  let content;

  if (isLoading) {
    content = <Skeleton />;
  } else if (isError) {
    content = <div>error</div>;
  } else if (isSuccess) {
    content = transfers.length ? <Transfers transfers={transfers} /> : <NotFound />;
  }

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
        <CloseButton onClick={onClose} />
        {content}
      </div>
    </motion.div>
  );
};

export default TransfersMenu;
