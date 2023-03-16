import { useTranslation } from "react-i18next";
import useAppContext from "../../hooks/useAppContext";
import { NAVIGATION_TABS } from "../../app/constants";
import styles from "./Navigation.module.scss";

const Navigation: React.FC = () => {
  const { t } = useTranslation();

  const { selectedTab, setSelectedTab } = useAppContext();

  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigationList}>
        {NAVIGATION_TABS.map((tab) => (
          <li key={tab}>
            <button
              className={`${styles.navigationButton} ${
                tab === selectedTab ? styles.selected : ""
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {t(tab)}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
