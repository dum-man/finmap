import { useState } from "react";
import { Link } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { FcGoogle } from "react-icons/fc";
import useAppDispatch from "hooks/useAppDispatch";
import { EMAIL_FORMAT } from "app/constants";
import {
  useCreateUserDocumentMutation,
  useLazyCheckUserExistsQuery,
} from "app/services/userApi";
import { toggleResetPasswordOpen } from "app/slices/appSlice";
import { PasswordInput, TextInput } from "components";
import { auth } from "app/config";
import { Button, Spinner } from "ui";
import { FIREBASE_LOGIN_ERRORS } from "../../constants";
import styles from "./LoginForm.module.css";

const LoginForm: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [checkUserExists] = useLazyCheckUserExistsQuery();
  const [createUserDocument] = useCreateUserDocumentMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signInWithEmailLoading, setSignInWithEmailLoading] = useState(false);
  const [signInWithGoogleLoading, setSignInWithGoogleLoading] = useState(false);

  const onEmailChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value.length > 40) {
      return;
    }
    setEmail(evt.target.value);
  };

  const onPasswordChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    const formattedEmail = email.replaceAll(" ", "").toLowerCase();
    const formattedPassword = password.replaceAll(" ", "");

    if (!EMAIL_FORMAT.test(formattedEmail)) {
      toast.error(t("invalidEmail"));
      return;
    }
    if (formattedPassword.length < 6) {
      toast.error(t("shortPassword"));
      return;
    }
    try {
      setSignInWithEmailLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(
          t(FIREBASE_LOGIN_ERRORS[error.message as keyof typeof FIREBASE_LOGIN_ERRORS]) ||
            error.message
        );
      }
    }
    setSignInWithEmailLoading(false);
  };

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setSignInWithGoogleLoading(true);
    try {
      const data = await signInWithPopup(auth, provider);
      if (!data) {
        throw new Error("Account creation failed");
      }
      const { uid, email } = data.user;
      const userExists = await checkUserExists({ userId: uid });
      if (!userExists.data) {
        await createUserDocument({ userId: uid, email }).unwrap();
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message);
      }
    }
    setSignInWithGoogleLoading(false);
  };

  return (
    <>
      <div className={styles["wrapper"]}>
        <h2 className={styles["title"]}>{t("login")}</h2>
        <Link className={styles["link"]} to="/Signup">
          {t("registerLink")}
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="email"
          label={t("email")}
          value={email}
          onChange={onEmailChange}
        />
        <PasswordInput
          label={t("password")}
          value={password}
          onChange={onPasswordChange}
        />
        <button
          className={styles["reset-button"]}
          type="button"
          onClick={() => dispatch(toggleResetPasswordOpen(true))}
        >
          {t("resetPasswordLink")}
        </button>
        <Button type="submit" loading={signInWithEmailLoading}>
          {t("enterButton")}
        </Button>
        <button
          className={classNames("submit-button", styles["google-button"])}
          type="button"
          disabled={signInWithGoogleLoading}
          onClick={handleSignInWithGoogle}
        >
          {signInWithGoogleLoading ? (
            <Spinner variant="dark" />
          ) : (
            <>
              <FcGoogle size="20px" /> {t("googleButton")}
            </>
          )}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
