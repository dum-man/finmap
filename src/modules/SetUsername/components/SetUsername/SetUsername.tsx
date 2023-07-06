import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";
import { Modal } from "layouts";
import { CloseButton } from "ui";
import { toggleSetUsernameOpen } from "app/slices/appSlice";
import SetUsernameForm from "../SetUsernameForm/SetUsernameForm";
import { RootState } from "app/store";
import styles from "./SetUsername.module.scss";

const SetUsername: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const setUsernameOpen = useSelector((state: RootState) => state.app.setUsernameOpen);

  const handleClose = () => {
    dispatch(toggleSetUsernameOpen(false));
  };

  return (
    <AnimatePresence>
      {setUsernameOpen && (
        <Modal onClose={handleClose}>
          <div className={styles.container}>
            <h2 className={styles.title}>{t("username")}</h2>
            <CloseButton onClick={handleClose} />
            <SetUsernameForm onClose={handleClose} />
          </div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default SetUsername;
