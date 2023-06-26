import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../../ui";
import Languages from "../Languages/Languages";

interface ContainerProps {
  onToggle: () => void;
}

const Container: React.FC<ContainerProps> = ({ onToggle }) => {
  const { t, i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState(() => i18n.resolvedLanguage);

  const onSaveSelectedLanguage = async () => {
    try {
      if (selectedLanguage !== i18n.resolvedLanguage) {
        await i18n.changeLanguage(selectedLanguage);
      }
      onToggle();
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Languages
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
      <Button type="button" onClick={onSaveSelectedLanguage}>
        {t("saveChanges")}
      </Button>
    </>
  );
};

export default Container;
