import { useTranslation } from "react-i18next";
import { AiOutlineCheckCircle } from "react-icons/ai";
import styles from "./ChangeSuccess.module.scss";

const ChangeSuccess: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <AiOutlineCheckCircle />
      <p>{t("passwordChanged")}</p>
      <p>{t("passwordChangedMessage")}</p>
    </div>
  );
};

export default ChangeSuccess;
