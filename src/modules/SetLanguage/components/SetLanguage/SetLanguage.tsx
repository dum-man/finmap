import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";
import { toggleSetLanguageOpen } from "app/slices/appSlice";
import { Modal } from "layouts";
import { CloseButton } from "ui";
import Container from "../Container/Container";
import { RootState } from "app/store";
import styles from "./SetLanguage.module.scss";

const SetLanguage: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const setLanguageOpen = useSelector((state: RootState) => state.app.setLanguageOpen);

  const handleClose = () => {
    dispatch(toggleSetLanguageOpen(false));
  };

  return (
    <AnimatePresence>
      {setLanguageOpen && (
        <Modal onClose={handleClose}>
          <div className={styles.container}>
            <h2 className={styles.title}>{t("interfaceLanguage")}</h2>
            <CloseButton onClick={handleClose} />
            <Container onToggle={handleClose} />
          </div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default SetLanguage;
