import { useState } from "react";
import { useTranslation } from "react-i18next";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import { MainPopup } from "components";
import { toggleResetPasswordOpen } from "app/slices/appSlice";
import ResetPasswordForm from "../ResetPasswordForm/ResetPasswordForm";
import ResetSuccess from "../ResetSuccess/ResetSuccess";

const ResetPassword: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const resetPasswordOpen = useAppSelector((state) => state.app.resetPasswordOpen);

  const [success, setSuccess] = useState(false);

  const handleClose = () => {
    dispatch(toggleResetPasswordOpen(false));
  };

  return (
    <MainPopup
      title={t("resetPassword")}
      isOpen={resetPasswordOpen}
      onClose={handleClose}
    >
      {success ? <ResetSuccess /> : <ResetPasswordForm setSuccess={setSuccess} />}
    </MainPopup>
  );
};

export default ResetPassword;
