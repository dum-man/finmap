import { NAVIGATION_TABS } from "../../constants";
import Tab from "../Tab/Tab";
import styles from "./Navigation.module.scss";

const Navigation: React.FC = () => {
  return (
    <nav className={styles.wrapper}>
      <ul className={styles.tabs}>
        {NAVIGATION_TABS.map((tab) => (
          <Tab key={tab} tab={tab} />
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
