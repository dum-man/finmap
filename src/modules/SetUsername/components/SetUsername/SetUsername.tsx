import { useTranslation } from "react-i18next";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import { toggleSetUsernameOpen } from "app/slices/appSlice";
import { MainPopup } from "components";
import SetUsernameForm from "../SetUsernameForm/SetUsernameForm";

const SetUsername: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const setUsernameOpen = useAppSelector((state) => state.app.setUsernameOpen);

  const handleClose = () => {
    dispatch(toggleSetUsernameOpen(false));
  };

  return (
    <MainPopup title={t("username")} isOpen={setUsernameOpen} onClose={handleClose}>
      <SetUsernameForm onClose={handleClose} />
    </MainPopup>
  );
};

export default SetUsername;
