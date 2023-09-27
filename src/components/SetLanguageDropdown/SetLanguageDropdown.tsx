import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { BsCheck } from "react-icons/bs";
import { TiArrowSortedDown } from "react-icons/ti";
import { Dropdown } from "ui";
import { LANGUAGES } from "app/constants";
import styles from "./SetLanguageDropdown.module.css";

const animation = {
  enter: styles["animation-enter"],
  enterActive: styles["animation-enter-active"],
  exit: styles["animation-exit"],
  exitActive: styles["animation-exit-active"],
};

const SetLanguageDropdown: React.FC = () => {
  const { i18n } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const parentRef = useRef(null);

  const handleClose = () => {
    setIsOpen(false);
  };

  const onLanguageClick = async (lng: string) => {
    try {
      if (lng !== i18n.resolvedLanguage) {
        await i18n.changeLanguage(lng);
      }
      setIsOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className={styles["wrapper"]}>
      <button
        className={styles["open-button"]}
        ref={parentRef}
        onClick={() => setIsOpen((prevOpen) => !prevOpen)}
      >
        {i18n.resolvedLanguage}
        <TiArrowSortedDown className={classNames({ [styles["rotate"]]: isOpen })} />
      </button>
      <Dropdown
        isOpen={isOpen}
        onClose={handleClose}
        className={styles["languages-container"]}
        animation={animation}
      >
        <ul className={styles["languages"]}>
          {Object.keys(LANGUAGES).map((lng) => (
            <li key={lng}>
              <button
                className={styles["language-button"]}
                onClick={() => onLanguageClick(lng)}
              >
                <span>{lng}</span>
                {i18n.resolvedLanguage === lng && <BsCheck />}
              </button>
            </li>
          ))}
        </ul>
      </Dropdown>
    </div>
  );
};

export default SetLanguageDropdown;
