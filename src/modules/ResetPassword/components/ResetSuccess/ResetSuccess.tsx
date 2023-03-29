import { useTranslation } from "react-i18next";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import styles from "./ResetSuccess.module.scss";

const ResetSuccess: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <MdOutlineMarkEmailRead />
      <p>{t("emailSentSuccessfully")}</p>
      <p>{t("checkYourInbox")}</p>
    </div>
  );
};

export default ResetSuccess;
