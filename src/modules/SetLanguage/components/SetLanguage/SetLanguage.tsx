import { useState } from "react";
import { useTranslation } from "react-i18next";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import { toggleSetLanguageOpen } from "app/slices/appSlice";
import { MainPopup } from "components";
import { Button } from "ui";
import Languages from "../Languages/Languages";

const SetLanguage: React.FC = () => {
  const { t, i18n } = useTranslation();

  const dispatch = useAppDispatch();

  const setLanguageOpen = useAppSelector((state) => state.app.setLanguageOpen);

  const [selectedLanguage, setSelectedLanguage] = useState(() => i18n.resolvedLanguage);

  const handleClose = () => {
    dispatch(toggleSetLanguageOpen(false));
    setSelectedLanguage(i18n.resolvedLanguage);
  };

  const onSaveSelectedLanguage = async () => {
    try {
      if (selectedLanguage !== i18n.resolvedLanguage) {
        await i18n.changeLanguage(selectedLanguage);
      }
      handleClose();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <MainPopup
      title={t("interfaceLanguage")}
      isOpen={setLanguageOpen}
      onClose={handleClose}
    >
      <Languages
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
      <Button type="button" onClick={onSaveSelectedLanguage}>
        {t("saveChanges")}
      </Button>
    </MainPopup>
  );
};

export default SetLanguage;
