import { MutableRefObject, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { motion } from "framer-motion";
import { CloseButton } from "../../../../ui";
import Transfers from "../Transfers/Transfers";
import NotFound from "../NotFound/NotFound";
import { transfersState } from "../../../../app/atoms/transfersAtom";
import { MENU_VARIANTS } from "../../../../app/constants";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";
import styles from "./TransfersMenu.module.scss";

interface TransfersMenuProps {
  setOpen: (open: React.SetStateAction<boolean>) => void;
  parentRef: MutableRefObject<null> | null;
}

const TransfersMenu: React.FC<TransfersMenuProps> = ({ setOpen, parentRef }) => {
  const { t } = useTranslation();

  const { transfers } = useRecoilValue(transfersState);

  const containerRef = useRef(null);

  const handleClickOutside = () => {
    setOpen(false);
  };

  useOnClickOutside(containerRef, parentRef, handleClickOutside);

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
        <CloseButton onClick={() => setOpen(false)} />
        {transfers.length ? <Transfers /> : <NotFound />}
      </div>
    </motion.div>
  );
};

export default TransfersMenu;
