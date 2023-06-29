import { useState } from "react";
import { useUpdatePassword } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { PasswordInput } from "components";
import { Button } from "ui";
import { auth } from "app/config";

interface ChangePasswordFormProps {
  setSuccess: (success: React.SetStateAction<boolean>) => void;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ setSuccess }) => {
  const [updatePassword, isLoading] = useUpdatePassword(auth);

  const { t } = useTranslation();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onOldPasswordChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(evt.target.value);
  };

  const onNewPasswordChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(evt.target.value);
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    const formattedOldPassword = oldPassword.replaceAll(" ", "");
    const formattedNewPassword = newPassword.replaceAll(" ", "");

    if (!formattedOldPassword || !formattedNewPassword) {
      toast.error(t("emptyPassword"));
      return;
    }
    if (formattedOldPassword.length < 6 || formattedNewPassword.length < 6) {
      toast.error(t("shortPassword"));
      return;
    }
    try {
      await updatePassword(newPassword);
      setSuccess(true);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <PasswordInput
        id="oldPassword"
        placeholder={t("oldPassword")}
        value={oldPassword}
        onChange={onOldPasswordChange}
      />
      <PasswordInput
        id="newPassword"
        placeholder={t("newPassword")}
        value={newPassword}
        onChange={onNewPasswordChange}
      />
      <Button type="submit" loading={isLoading}>
        {t("save")}
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
