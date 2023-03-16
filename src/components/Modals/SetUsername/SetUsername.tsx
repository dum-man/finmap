import { useState } from "react";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-hot-toast";
import CloseButton from "../../UI/CloseButton/CloseButton";
import Modal from "../../UI/Modal/Modal";
import Spinner from "../../UI/Spinner/Spinner";
import { updateUserProfile } from "../../../app/service/userService";
import { auth } from "../../../app/firebase";
import { INPUT_LABEL_VARIANTS, INPUT_LENGTH_VARIANTS } from "../../../app/constants";
import styles from "./Modal.module.scss";

interface SetUsernameProps {
  setOpen: (open: boolean) => void;
}

const SetUsername: React.FC<SetUsernameProps> = ({ setOpen }) => {
  const [currentUser] = useAuthState(auth);
  const [updateProfile, updating] = useUpdateProfile(auth);

  const { t } = useTranslation();

  const [userName, setUsername] = useState(
    currentUser?.displayName || t("accountType").toString()
  );
  const [usernameLengthVisible, setUsernameLengthVisible] = useState(false);

  const onUsernameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value.length > 20) {
      return;
    }
    setUsername(evt.target.value);
  };

  const onUpdateUserProfile = async (evt: React.FormEvent) => {
    evt.preventDefault();

    const formattedUsername = userName.trim();

    if (formattedUsername === currentUser?.displayName) {
      setOpen(false);
      return;
    }
    if (!formattedUsername.length) {
      toast.error(t("usernameError"));
      return;
    }
    try {
      await updateUserProfile(currentUser?.uid, formattedUsername, updateProfile);
      setOpen(false);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <Modal onClose={() => setOpen(false)}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("username")}</h2>
        <CloseButton onClose={() => setOpen(false)} />
        <form onSubmit={onUpdateUserProfile}>
          <div className={styles.inputWrapper}>
            <input
              className={`${styles.input} ${userName ? styles.inputActive : ""}`}
              id="name"
              placeholder={t("username").toString()}
              value={userName}
              onChange={onUsernameChange}
              onFocus={() => setUsernameLengthVisible(true)}
              onBlur={() => setUsernameLengthVisible(false)}
            />
            {userName && (
              <motion.label
                className={styles.label}
                htmlFor="name"
                variants={INPUT_LABEL_VARIANTS}
                initial="hidden"
                animate="visible"
              >
                {t("username")}
              </motion.label>
            )}
            <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
              {usernameLengthVisible && (
                <motion.span
                  className={styles.inputLength}
                  variants={INPUT_LENGTH_VARIANTS}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {20 - userName.length}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <button className={styles.submitButton} type="submit" disabled={updating}>
            {updating ? <Spinner /> : t("setName")}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default SetUsername;
