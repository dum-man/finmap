import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { PasswordInput, TextInput } from "../../../../components";
import { Button, Spinner } from "../../../../ui";
import ResetPassword from "../../../../modules/ResetPassword";
import signInWithGoogle from "../../api";
import { auth } from "../../../../firebase";
import { EMAIL_FORMAT } from "../../../../app/constants";
import { FIREBASE_LOGIN_ERRORS } from "../../constants";
import styles from "./LoginForm.module.scss";

const LoginForm: React.FC = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
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
    } catch (error: any) {
      console.log(error.message);
      toast.error(
        t(FIREBASE_LOGIN_ERRORS[error.message as keyof typeof FIREBASE_LOGIN_ERRORS]) ||
          error.message
      );
    }
    setSignInWithEmailLoading(false);
  };
  const handleSignInWithGoogle = async () => {
    setSignInWithGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    setSignInWithGoogleLoading(false);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{t("login")}</h2>
        <Link className={styles.link} to="/signup">
          {t("registerLink")}
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="email"
          id="email"
          placeholder={t("email")}
          value={email}
          onChange={onEmailChange}
        />
        <PasswordInput
          id="password"
          placeholder={t("password")}
          value={password}
          onChange={onPasswordChange}
        />
        <button
          className={styles.resetButton}
          type="button"
          onClick={() => setModalOpen(true)}
        >
          {t("resetPasswordLink")}
        </button>
        <Button type="submit" loading={signInWithEmailLoading}>
          {t("enterButton")}
        </Button>
        <button
          className={styles.googleButton}
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
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {modalOpen && <ResetPassword setOpen={setModalOpen} />}
      </AnimatePresence>
    </>
  );
};

export default LoginForm;
