import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { useIsFirstRender } from "usehooks-ts";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { BiHide, BiShow } from "react-icons/bi";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import SetLanguage from "../../components/Popovers/SetLanguage/SetLanguage";
import Spinner from "../../components/UI/Spinner/Spinner";
import {
  EMAIL_FORMAT,
  FIREBASE_REGISTER_ERROR,
  INPUT_LABEL_VARIANTS,
} from "../../app/constants";
import { auth } from "../../app/firebase";
import { createUserDocument } from "../../app/service/userService";
import styles from "./Signup.module.scss";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser] = useAuthState(auth);
  const isFirstRender = useIsFirstRender();

  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmedPasswordVisible, setConfirmedPasswordVisible] = useState(false);
  const [userCreating, setUserCreating] = useState(false);

  const onEmailChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
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
        await createUserDocument(data.user.uid, data.user.email);
        navigate("/", { replace: true });
      } else {
        throw new Error(t("accountCreationFailed").toString());
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(
        t(
          FIREBASE_REGISTER_ERROR[error.message as keyof typeof FIREBASE_REGISTER_ERROR]
        ) || error.message
      );
    }
    setUserCreating(false);
  };

  useEffect(() => {
    if (isFirstRender && currentUser) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <AuthLayout>
      <SetLanguage />
      <div className={styles.wrapper}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>{t("registration")}</h2>
          <Link className={styles.link} to="/login">
            {t("loginLink")}
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <input
              className={`${styles.input} ${email ? styles.inputActive : ""}`}
              id="email"
              type="email"
              placeholder={t("registerEmail").toString()}
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
              placeholder={t("registerPassword").toString()}
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
                {t("registerPassword")}
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
          <div className={styles.inputWrapper}>
            <input
              className={`${styles.input} ${confirmedPassword ? styles.inputActive : ""}`}
              id="confirmPassword"
              type={confirmedPasswordVisible ? "text" : "password"}
              placeholder={t("confirmPassword").toString()}
              maxLength={30}
              value={confirmedPassword}
              onChange={onConfirmedPasswordChange}
            />
            {confirmedPassword && (
              <motion.label
                className={styles.label}
                htmlFor="confirmPassword"
                variants={INPUT_LABEL_VARIANTS}
                initial="hidden"
                animate="visible"
              >
                {t("confirmPassword")}
              </motion.label>
            )}
            <button
              className={styles.showButton}
              type="button"
              onClick={() => setConfirmedPasswordVisible((prev) => !prev)}
            >
              {confirmedPasswordVisible ? <BiHide /> : <BiShow />}
            </button>
          </div>
          <button className={styles.submitButton} type="submit" disabled={userCreating}>
            {userCreating ? <Spinner /> : t("nextButton")}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
