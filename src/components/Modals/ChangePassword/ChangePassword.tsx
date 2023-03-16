import { useState } from "react";
import { useUpdatePassword } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { BiHide, BiShow } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Modal from "../../UI/Modal/Modal";
import CloseButton from "../../UI/CloseButton/CloseButton";
import Spinner from "../../UI/Spinner/Spinner";
import { auth } from "../../../app/firebase";
import { INPUT_LABEL_VARIANTS } from "../../../app/constants";
import styles from "./Modal.module.scss";

interface ChangePasswordProps {
  setOpen: (open: boolean) => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ setOpen }) => {
  const [updatePassword, updating] = useUpdatePassword(auth);

  const { t } = useTranslation();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [success, setSuccess] = useState(false);

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
    <Modal onClose={() => setOpen(false)}>
      <div className={styles.container}>
        <CloseButton onClose={() => setOpen(false)} />
        {success ? (
          <div className={styles.successWrapper}>
            <AiOutlineCheckCircle />
            <p>{t("passwordChanged")}</p>
            <p>{t("passwordChangedMessage")}</p>
          </div>
        ) : (
          <>
            <h2 className={styles.title}>{t("changePassword")}</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputWrapper}>
                <input
                  className={`${styles.input} ${oldPassword ? styles.inputActive : ""}`}
                  id="oldPassword"
                  type={oldPasswordVisible ? "text" : "password"}
                  placeholder={t("oldPassword").toString()}
                  maxLength={30}
                  value={oldPassword}
                  onChange={onOldPasswordChange}
                />
                {oldPassword && (
                  <motion.label
                    className={styles.label}
                    htmlFor="oldPassword"
                    variants={INPUT_LABEL_VARIANTS}
                    initial="hidden"
                    animate="visible"
                  >
                    {t("oldPassword")}
                  </motion.label>
                )}
                <button
                  className={styles.showButton}
                  type="button"
                  onClick={() => setOldPasswordVisible((prev) => !prev)}
                >
                  {oldPasswordVisible ? <BiHide /> : <BiShow />}
                </button>
              </div>
              <div className={styles.inputWrapper}>
                <input
                  className={`${styles.input} ${newPassword ? styles.inputActive : ""}`}
                  id="newPassword"
                  type={newPasswordVisible ? "text" : "password"}
                  placeholder={t("newPassword").toString()}
                  maxLength={30}
                  value={newPassword}
                  onChange={onNewPasswordChange}
                />
                {newPassword && (
                  <motion.label
                    className={styles.label}
                    htmlFor="newPassword"
                    variants={INPUT_LABEL_VARIANTS}
                    initial="hidden"
                    animate="visible"
                  >
                    {t("newPassword")}
                  </motion.label>
                )}
                <button
                  className={styles.showButton}
                  type="button"
                  onClick={() => setNewPasswordVisible((prev) => !prev)}
                >
                  {newPasswordVisible ? <BiHide /> : <BiShow />}
                </button>
              </div>
              <button className={styles.submitButton} type="submit" disabled={updating}>
                {updating ? <Spinner /> : t("save")}
              </button>
            </form>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ChangePassword;
