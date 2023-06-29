import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { toggleChangePasswordOpen, toggleSetLanguageOpen } from "app/slices/appSlice";
import styles from "./SettingsItems.module.scss";

const SettingItems: React.FC = () => {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{t("settings")}</h3>
      <ul>
        <li>
          <button
            className={styles.button}
            onClick={() => dispatch(toggleChangePasswordOpen())}
          >
            {t("changePassword")}
          </button>
        </li>
        <li>
          <button
            className={styles.button}
            onClick={() => dispatch(toggleSetLanguageOpen())}
          >
            🌎 {t("language")}:
            <span className={styles.currentLanguage}>{i18n.resolvedLanguage}</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SettingItems;
