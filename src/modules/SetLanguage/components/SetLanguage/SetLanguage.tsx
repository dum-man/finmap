import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, CloseButton, Modal } from "../../../../ui";
import Languages from "../Languages/Languages";
import styles from "./SetLanguage.module.scss";

interface SetLanguageProps {
  onClose: () => void;
}

const SetLanguage: React.FC<SetLanguageProps> = ({ onClose }) => {
  const { t, i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState(() => i18n.resolvedLanguage);

  const onSaveSelectedLanguage = async () => {
    try {
      if (selectedLanguage !== i18n.resolvedLanguage) {
        await i18n.changeLanguage(selectedLanguage);
      }
      onClose();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("interfaceLanguage")}</h2>
        <CloseButton onClick={onClose} />
        <Languages
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
        <Button type="button" onClick={onSaveSelectedLanguage}>
          {t("saveChanges")}
        </Button>
      </div>
    </Modal>
  );
};

export default SetLanguage;
