import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { PasswordInput, TextInput } from "components";
import { Button } from "ui";
import { useCreateUserDocumentMutation } from "app/services/userApi";
import { auth } from "app/config";
import { EMAIL_FORMAT } from "app/constants";
import { FIREBASE_REGISTER_ERROR } from "../../constants";
import styles from "./SignupForm.module.css";

const SignupForm: React.FC = () => {
  const { t } = useTranslation();

  const [createUserDocument] = useCreateUserDocumentMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [userCreating, setUserCreating] = useState(false);

  const onEmailChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value.length > 40) {
      return;
    }
    setEmail(evt.target.value);
  };

  const onPasswordChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };

  const onConfirmedPasswordChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmedPassword(evt.target.value);
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    const formattedEmail = email.replaceAll(" ", "").toLowerCase();
    const formattedPassword = password.replaceAll(" ", "");
    const formattedConfirmPassword = confirmedPassword.replaceAll(" ", "");

    if (!EMAIL_FORMAT.test(formattedEmail)) {
      toast.error(t("invalidEmail"));
      return;
    }
    if (formattedPassword.length < 6) {
      toast.error(t("shortPassword"));
      return;
    }
    if (formattedPassword.length !== formattedConfirmPassword.length) {
      toast.error(t("wrongPasswords"));
      return;
    }
    try {
      setUserCreating(true);
      const data = await createUserWithEmailAndPassword(auth, email, password);
      if (data) {
        const { uid, email } = data.user;
        await createUserDocument({ userId: uid, email }).unwrap();
      } else {
        throw new Error(t("accountCreationFailed").toString());
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(
          t(
            FIREBASE_REGISTER_ERROR[error.message as keyof typeof FIREBASE_REGISTER_ERROR]
          ) || error.message
        );
      }
    }
    setUserCreating(false);
  };

  return (
    <>
      <div className={styles["wrapper"]}>
        <h2 className={styles["title"]}>{t("registration")}</h2>
        <Link className={styles["link"]} to="/login">
          {t("loginLink")}
        </Link>
      </div>
      <form className={styles["form"]} onSubmit={handleSubmit}>
        <TextInput
          type="email"
          label={t("registerEmail")}
          value={email}
          onChange={onEmailChange}
        />
        <PasswordInput
          label={t("registerPassword")}
          value={password}
          onChange={onPasswordChange}
        />
        <PasswordInput
          label={t("confirmPassword")}
          value={confirmedPassword}
          onChange={onConfirmedPasswordChange}
        />
        <Button type="submit" loading={userCreating}>
          {t("nextButton")}
        </Button>
      </form>
    </>
  );
};

export default SignupForm;
