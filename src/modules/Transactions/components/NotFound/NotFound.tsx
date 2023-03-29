import { useTranslation } from "react-i18next";
import notFoundImage from "../../../../assets/images/not-found.svg";
import styles from "./NotFound.module.scss";

interface NotFoundProps {
  filtered?: boolean;
}

const NotFound: React.FC<NotFoundProps> = ({ filtered = false }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.notFound}>
      <img src={notFoundImage} alt="sun and sea" />
      <p>{filtered ? t("noSuchTransactions") : t("noTransactionsFound")}</p>
      <p>{filtered ? t("noSuchTransactionsMessage") : t("noTransactionsFoundMessage")}</p>
    </div>
  );
};

export default NotFound;
