import { useTranslation } from "react-i18next";
import styles from "./SettingsItems.module.scss";

interface SettingItemsProps {
  setChangePasswordOpen: (open: React.SetStateAction<boolean>) => void;
  setSetLanguageOpen: (open: React.SetStateAction<boolean>) => void;
}

const SettingItems: React.FC<SettingItemsProps> = ({
  setChangePasswordOpen,
  setSetLanguageOpen,
}) => {
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{t("settings")}</h3>
      <ul>
        <li>
          <button className={styles.button} onClick={() => setChangePasswordOpen(true)}>
            {t("changePassword")}
          </button>
        </li>
        <li>
          <button className={styles.button} onClick={() => setSetLanguageOpen(true)}>
            🌎 {t("language")}:
            <span className={styles.currentLanguage}>{i18n.resolvedLanguage}</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SettingItems;
