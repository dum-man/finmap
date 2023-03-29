import { useTranslation } from "react-i18next";
import useAppContext from "../../../../hooks/useAppContext";
import styles from "./Tab.module.scss";

interface TabProps {
  tab: string;
}

const Tab: React.FC<TabProps> = ({ tab }) => {
  const { t } = useTranslation();

  const { selectedTab, setSelectedTab } = useAppContext();

  return (
    <li>
      <button
        className={`${styles.button} ${tab === selectedTab ? styles.selected : ""}`}
        onClick={() => setSelectedTab(tab)}
      >
        {t(tab)}
      </button>
    </li>
  );
};

export default Tab;
