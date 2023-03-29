import { BsCheck } from "react-icons/bs";
import { LANGUAGES } from "../../../../app/constants";
import { LANGUAGE_FlAGS } from "../../constants";
import styles from "./Languages.module.scss";

interface LanguagesProps {
  selectedLanguage: string;
  setSelectedLanguage: (lng: React.SetStateAction<string>) => void;
}

const Languages: React.FC<LanguagesProps> = ({
  selectedLanguage,
  setSelectedLanguage,
}) => {
  return (
    <ul className={styles.languages}>
      {Object.keys(LANGUAGES).map((lng) => (
        <li key={lng}>
          <button
            key={lng}
            className={styles.languageItem}
            onClick={() => setSelectedLanguage(lng)}
          >
            <span>{LANGUAGE_FlAGS[lng as keyof typeof LANGUAGE_FlAGS]}</span>
            <span>{LANGUAGES[lng as keyof typeof LANGUAGES].nativeName}</span>
            {selectedLanguage === lng && <BsCheck />}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Languages;
