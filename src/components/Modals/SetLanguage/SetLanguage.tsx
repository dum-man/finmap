import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsCheck } from "react-icons/bs";
import CloseButton from "../../UI/CloseButton/CloseButton";
import Modal from "../../UI/Modal/Modal";
import { LANGUAGES, LANGUAGE_FlAGS } from "../../../app/constants";
import styles from "./Modal.module.scss";

interface SetLanguageProps {
  setOpen: (open: boolean) => void;
}

const SetLanguage: React.FC<SetLanguageProps> = ({ setOpen }) => {
  const { t, i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState(i18n.resolvedLanguage);

  const onSaveSelectedLanguage = async () => {
    try {
      if (selectedLanguage !== i18n.resolvedLanguage) {
        await i18n.changeLanguage(selectedLanguage);
      }
      setOpen(false);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Modal onClose={() => setOpen(false)}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("interfaceLanguage")}</h2>
        <CloseButton onClose={() => setOpen(false)} />
        <ul className={styles.languageList}>
          {Object.keys(LANGUAGES).map((lng) => (
            <li key={lng}>
              <button
                key={lng}
                className={styles.languageButton}
                onClick={() => setSelectedLanguage(lng)}
              >
                <span>{LANGUAGE_FlAGS[lng as keyof typeof LANGUAGE_FlAGS]}</span>
                <span>{LANGUAGES[lng as keyof typeof LANGUAGES].nativeName}</span>
                {selectedLanguage === lng && <BsCheck />}
              </button>
            </li>
          ))}
        </ul>
        <button className={styles.submitButton} onClick={onSaveSelectedLanguage}>
          {t("saveChanges")}
        </button>
      </div>
    </Modal>
  );
};

export default SetLanguage;
