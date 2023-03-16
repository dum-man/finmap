import { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { Trans, useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import Spinner from "../../UI/Spinner/Spinner";
import Modal from "../../UI/Modal/Modal";
import CloseButton from "../../UI/CloseButton/CloseButton";
import { auth } from "../../../app/firebase";
import { EMAIL_FORMAT, INPUT_LABEL_VARIANTS } from "../../../app/constants";
import styles from "./Modal.module.scss";

interface ResetPasswordProps {
  setOpen: (open: boolean) => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ setOpen }) => {
  const [sendPasswordResetEmail, resetLoading] = useSendPasswordResetEmail(auth);

  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const onEmailChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
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
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <Modal onClose={() => setOpen(false)}>
      <div className={styles.wrapper}>
        <CloseButton onClose={() => setOpen(false)} />
        {success ? (
          <div className={styles.successWrapper}>
            <MdOutlineMarkEmailRead />
            <p>{t("emailSentSuccessfully")}</p>
            <p>{t("checkYourInbox")}</p>
          </div>
        ) : (
          <>
            <h2 className={styles.title}>{t("resetPassword")}</h2>
            <p className={styles.prompt}>
              <Trans i18nKey="emailForReset"></Trans>
            </p>
            <form onSubmit={onSubmit}>
              <div className={styles.inputWrapper}>
                <input
                  className={`${styles.input} ${email ? styles.inputActive : ""}`}
                  id="recover"
                  type="email"
                  placeholder={t("email").toString()}
                  maxLength={40}
                  value={email}
                  onChange={onEmailChange}
                />
                {email && (
                  <motion.label
                    className={styles.label}
                    htmlFor="recover"
                    variants={INPUT_LABEL_VARIANTS}
                    initial="hidden"
                    animate="visible"
                  >
                    {t("email")}
                  </motion.label>
                )}
              </div>
              <button
                className={styles.submitButton}
                type="submit"
                disabled={resetLoading}
              >
                {resetLoading ? <Spinner /> : t("recover")}
              </button>
            </form>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ResetPassword;
