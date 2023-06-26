import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { TabType } from "../../../../types";
import styles from "./Tab.module.scss";

interface TabProps {
  tab: TabType;
  onChange: (tab: TabType) => void;
  isActive: boolean;
}

const Tab: React.FC<TabProps> = ({ tab, isActive, onChange }) => {
  const { t } = useTranslation();

  return (
    <li>
      <button
        className={classNames(styles.button, { [styles.selected]: isActive })}
        onClick={() => onChange(tab)}
      >
        {t(tab)}
      </button>
    </li>
  );
};

export default Tab;
