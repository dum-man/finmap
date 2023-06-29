import { useState } from "react";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { TextInput } from "components";
import { Button } from "ui";
import { useUpdateUserProfileMutation } from "app/services/userApi";
import { auth } from "app/config";

interface SetUsernameFormProps {
  onClose: () => void;
}

const SetUsernameForm: React.FC<SetUsernameFormProps> = ({ onClose }) => {
  const [currentUser] = useAuthState(auth);
  const [updateProfile, isUpdating] = useUpdateProfile(auth);

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const { t } = useTranslation();

  const [userName, setUsername] = useState(
    currentUser?.displayName || t("accountType").toString()
  );

  const onUsernameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value.length > 20) {
      return;
    }
    setUsername(evt.target.value);
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!currentUser) {
      return;
    }

    const formattedUsername = userName.trim();

    if (formattedUsername === currentUser?.displayName) {
      onClose();
      return;
    }
    if (!formattedUsername.length) {
      toast.error(t("usernameError"));
      return;
    }
    try {
      await updateProfile({
        displayName: formattedUsername,
      });
      await updateUserProfile({
        userId: currentUser.uid,
        displayName: formattedUsername,
      }).unwrap();
      onClose();
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        id="username"
        placeholder={t("username")}
        maxLength={20}
        value={userName}
        onChange={onUsernameChange}
      />
      <Button type="submit" loading={isUpdating || isLoading}>
        {t("setName")}
      </Button>
    </form>
  );
};

export default SetUsernameForm;
