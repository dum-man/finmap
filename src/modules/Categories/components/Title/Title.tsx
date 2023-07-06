import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "app/store";
import styles from "./Title.module.scss";

const Title: React.FC = () => {
  const { t } = useTranslation();

  const categoryType = useSelector((state: RootState) => state.app.categoryType);

  return <h2 className={styles.title}>{t(`${categoryType}Categories`)}</h2>;
};

export default Title;
