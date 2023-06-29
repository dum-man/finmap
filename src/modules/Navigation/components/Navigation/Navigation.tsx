import { SetStateAction } from "react";
import { NAVIGATION_TABS } from "../../constants";
import Tab from "../Tab/Tab";
import { TabType } from "types";
import styles from "./Navigation.module.scss";

interface NavigationProps {
  selectedTab: TabType;
  setSelectedTab: (tab: SetStateAction<TabType>) => void;
}

const Navigation: React.FC<NavigationProps> = ({ selectedTab, setSelectedTab }) => {
  const handleChangeTab = (tab: TabType) => {
    setSelectedTab(tab);
  };

  return (
    <nav className={styles.wrapper}>
      <ul className={styles.tabs}>
        {NAVIGATION_TABS.map((tab) => (
          <Tab
            key={tab}
            tab={tab}
            onChange={handleChangeTab}
            isActive={tab === selectedTab}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
