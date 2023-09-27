import { useTranslation } from "react-i18next";
import useAppDispatch from "hooks/useAppDispatch";
import { toggleChangePasswordOpen, toggleSetLanguageOpen } from "app/slices/appSlice";
import styles from "./SettingsItems.module.css";

const SettingItems: React.FC = () => {
  const { t, i18n } = useTranslation();

  const dispatch = useAppDispatch();

  return (
    <div className={styles["wrapper"]}>
      <h3 className={styles["title"]}>{t("settings")}</h3>
      <ul>
        <li>
          <button
            className={styles["button"]}
            onClick={() => dispatch(toggleChangePasswordOpen(true))}
          >
            {t("changePassword")}
          </button>
        </li>
        <li>
          <button
            className={styles["button"]}
            onClick={() => dispatch(toggleSetLanguageOpen(true))}
          >
            🌎 {t("language")}:
            <span className={styles["current-language"]}>{i18n.resolvedLanguage}</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SettingItems;
