import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { toggleSetLanguageOpen } from "app/slices/appSlice";
import { Modal } from "layouts";
import { CloseButton } from "ui";
import Container from "../Container/Container";
import styles from "./SetLanguage.module.scss";

const SetLanguage: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleSetLanguageOpen());
  };

  return (
    <Modal onClose={handleToggle}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("interfaceLanguage")}</h2>
        <CloseButton onClick={handleToggle} />
        <Container onToggle={handleToggle} />
      </div>
    </Modal>
  );
};

export default SetLanguage;
