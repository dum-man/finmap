import { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { Trans, useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { TextInput } from "components";
import { Button } from "ui";
import { auth } from "app/config";
import { EMAIL_FORMAT } from "app/constants";
import styles from "./ResetPasswordForm.module.css";

interface ResetPasswordFormProps {
  setSuccess: (success: React.SetStateAction<boolean>) => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ setSuccess }) => {
  const [sendPasswordResetEmail, isLoading] = useSendPasswordResetEmail(auth);

  const { t } = useTranslation();

  const [email, setEmail] = useState("");

  const onEmailChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value.length > 40) {
      return;
    }
    setEmail(evt.target.value);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formattedEmail = email.replaceAll(" ", "");

    if (!EMAIL_FORMAT.test(formattedEmail)) {
      toast.error(t("invalidEmail"));
      return;
    }
    try {
      await sendPasswordResetEmail(formattedEmail);
      setSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <p className={styles["prompt"]}>
        <Trans i18nKey="emailForReset"></Trans>
      </p>
      <form onSubmit={onSubmit}>
        <TextInput
          type="email"
          label={t("email")}
          value={email}
          onChange={onEmailChange}
        />
        <Button type="submit" loading={isLoading}>
          {t("recover")}
        </Button>
      </form>
    </>
  );
};

export default ResetPasswordForm;
