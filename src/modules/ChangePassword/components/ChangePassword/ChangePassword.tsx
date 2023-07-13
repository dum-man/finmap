import { useState } from "react";
import { useTranslation } from "react-i18next";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import { MainPopup } from "components";
import { toggleChangePasswordOpen } from "app/slices/appSlice";
import ChangeSuccess from "../ChangeSuccess/ChangeSuccess";
import ChangePasswordForm from "../ChangePasswordForm/ChangePasswordForm";

const ChangePassword: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const changePasswordOpen = useAppSelector((state) => state.app.changePasswordOpen);

  const [success, setSuccess] = useState(false);

  const handleClose = () => {
    dispatch(toggleChangePasswordOpen(false));
  };

  return (
    <MainPopup
      title={t("changePassword")}
      isOpen={changePasswordOpen}
      onClose={handleClose}
    >
      {success ? <ChangeSuccess /> : <ChangePasswordForm setSuccess={setSuccess} />}
    </MainPopup>
  );
};

export default ChangePassword;
