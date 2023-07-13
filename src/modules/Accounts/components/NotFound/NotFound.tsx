import { useTranslation } from "react-i18next";
import notFoundImage from "assets/images/not-found.svg";
import styles from "./NotFound.module.scss";

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.notFound}>
      <img src={notFoundImage} alt="sun and sea" />
      <p>{t("accountsNotFound")}</p>
      <p>{t("accountsNotFoundMessage")}</p>
    </div>
  );
};

export default NotFound;
