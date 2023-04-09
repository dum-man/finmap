import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { BsCheck } from "react-icons/bs";
import { TiArrowSortedDown } from "react-icons/ti";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { LANGUAGES, LANGUAGE_VARIANTS } from "../../app/constants";
import styles from "./SetLanguageDropdown.module.scss";

const SetLanguageDropdown: React.FC = () => {
  const { i18n } = useTranslation();

  const [open, setOpen] = useState(false);

  const containerRef = useRef(null);
  const parentRef = useRef(null);

  const handleClickOutside = () => {
    setOpen(false);
  };

  useOnClickOutside(containerRef, parentRef, handleClickOutside);

  const onLanguageClick = async (lng: string) => {
    try {
      if (lng !== i18n.resolvedLanguage) {
        await i18n.changeLanguage(lng);
      }
      setOpen(false);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.openButton}
        ref={parentRef}
        onClick={() => setOpen((prev) => !prev)}
      >
        {i18n.resolvedLanguage}
        <TiArrowSortedDown className={open ? styles.rotate : ""} />
      </button>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {open && (
          <motion.ul
            className={styles.languages}
            variants={LANGUAGE_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            ref={containerRef}
          >
            {Object.keys(LANGUAGES).map((lng) => (
              <li key={lng}>
                <button
                  className={styles.languageButton}
                  onClick={() => onLanguageClick(lng)}
                >
                  <span>{lng}</span>
                  {i18n.resolvedLanguage === lng && <BsCheck />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SetLanguageDropdown;
