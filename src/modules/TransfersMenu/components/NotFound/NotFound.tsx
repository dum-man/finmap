import { useTranslation } from "react-i18next";
import notFoundImage from "assets/images/not-found.svg";
import styles from "./NotFound.module.css";

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles["wrapper"]}>
      <img src={notFoundImage} height={97} alt="sun and sea" />
      <p>{t("transfersNotFound")}</p>
      <p>{t("transfersNotFoundMessage")}</p>
    </div>
  );
};

export default NotFound;
