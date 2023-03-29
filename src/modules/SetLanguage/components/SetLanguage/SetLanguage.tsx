import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, CloseButton, Modal } from "../../../../ui";
import Languages from "../Languages/Languages";
import styles from "./SetLanguage.module.scss";

interface SetLanguageProps {
  setOpen: (open: React.SetStateAction<boolean>) => void;
}

const SetLanguage: React.FC<SetLanguageProps> = ({ setOpen }) => {
  const { t, i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState(() => i18n.resolvedLanguage);

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
        <CloseButton onClick={() => setOpen(false)} />
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
