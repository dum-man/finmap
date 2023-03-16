import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { useIsFirstRender } from "usehooks-ts";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { BiShow, BiHide } from "react-icons/bi";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import SetLanguage from "../../components/Popovers/SetLanguage/SetLanguage";
import ResetPasswordModal from "../../components/Modals/ResetPassword/ResetPassword";
import Spinner from "../../components/UI/Spinner/Spinner";
import { signInWithGoogle } from "../../app/service/userService";
import { auth } from "../../app/firebase";
import {
  EMAIL_FORMAT,
  FIREBASE_LOGIN_ERRORS,
  INPUT_LABEL_VARIANTS,
} from "../../app/constants";
import styles from "./Login.module.scss";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser] = useAuthState(auth);
  const isFirstRender = useIsFirstRender();

  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [signInWithEmailLoading, setSignInWithEmailLoading] = useState(false);
  const [signInWithGoogleLoading, setSignInWithGoogleLoading] = useState(false);

  const onEmailChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
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
      navigate("/", { replace: true });
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
      navigate("/", { replace: true });
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    setSignInWithGoogleLoading(false);
  };

  useEffect(() => {
    if (isFirstRender && currentUser) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <AuthLayout>
      <SetLanguage />
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>{t("login")}</h2>
        <Link className={styles.link} to="/signup">
          {t("registerLink")}
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <input
            className={`${styles.input} ${email ? styles.inputActive : ""}`}
            id="email"
            type="email"
            placeholder={t("email").toString()}
            maxLength={40}
            value={email}
            onChange={onEmailChange}
          />
          {email && (
            <motion.label
              className={styles.label}
              htmlFor="email"
              variants={INPUT_LABEL_VARIANTS}
              initial="hidden"
              animate="visible"
            >
              {t("email")}
            </motion.label>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <input
            className={`${styles.input} ${password ? styles.inputActive : ""}`}
            id="password"
            type={passwordVisible ? "text" : "password"}
            placeholder={t("password").toString()}
            maxLength={30}
            value={password}
            onChange={onPasswordChange}
          />
          {password && (
            <motion.label
              className={styles.label}
              htmlFor="password"
              variants={INPUT_LABEL_VARIANTS}
              initial="hidden"
              animate="visible"
            >
              {t("password")}
            </motion.label>
          )}
          <button
            className={styles.showButton}
            type="button"
            onClick={() => setPasswordVisible((prev) => !prev)}
          >
            {passwordVisible ? <BiHide /> : <BiShow />}
          </button>
        </div>
        <button
          className={styles.resetButton}
          type="button"
          onClick={() => setModalOpen(true)}
        >
          {t("resetPasswordLink")}
        </button>
        <button
          className={`${styles.button} ${styles.submitButton}`}
          type="submit"
          disabled={signInWithEmailLoading}
        >
          {signInWithEmailLoading ? <Spinner /> : t("enterButton")}
        </button>
        <button
          className={styles.button}
          type="button"
          disabled={signInWithGoogleLoading}
          onClick={handleSignInWithGoogle}
        >
          {signInWithGoogleLoading ? (
            <Spinner dark />
          ) : (
            <>
              <FcGoogle size="20px" /> {t("googleButton")}
            </>
          )}
        </button>
      </form>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {modalOpen && <ResetPasswordModal setOpen={setModalOpen} />}
      </AnimatePresence>
    </AuthLayout>
  );
};

export default Login;
