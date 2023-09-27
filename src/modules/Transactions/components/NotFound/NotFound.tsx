import { useTranslation } from "react-i18next";
import notFoundImage from "assets/images/not-found.svg";
import styles from "./NotFound.module.css";

interface NotFoundProps {
  noMatches?: boolean;
}

const NotFound: React.FC<NotFoundProps> = ({ noMatches = false }) => {
  const { t } = useTranslation();

  return (
    <div className={styles["wrapper"]}>
      <img src={notFoundImage} height={97} alt="sun and sea" />
      <p>{noMatches ? t("noSuchTransactions") : t("noTransactionsFound")}</p>
      <p>
        {noMatches ? t("noSuchTransactionsMessage") : t("noTransactionsFoundMessage")}
      </p>
    </div>
  );
};

export default NotFound;
