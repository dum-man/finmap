import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Timestamp } from "firebase/firestore";
import { useSetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { NumberFormatValues, NumericFormat } from "react-number-format";
import Modal from "../../UI/Modal/Modal";
import CloseButton from "../../UI/CloseButton/CloseButton";
import Spinner from "../../UI/Spinner/Spinner";
import { accountsState } from "../../../app/atoms/accountsAtom";
import { createAccount } from "../../../app/service/accountsService";
import { INPUT_LABEL_VARIANTS, INPUT_LENGTH_VARIANTS } from "../../../app/constants";
import { auth } from "../../../app/firebase";
import { Account } from "../../../types";
import styles from "./Modal.module.scss";

interface CreateAccountProps {
  setOpen: (open: boolean) => void;
}

const CreateAccount: React.FC<CreateAccountProps> = ({ setOpen }) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const setAccountState = useSetRecoilState(accountsState);

  const [accountName, setAccountName] = useState("");
  const [accountBalance, setAccountBalance] = useState("0");
  const [accountLengthVisible, setAccountLengthVisible] = useState(false);
  const [accountCreating, setAccountCreating] = useState(false);

  const onAccountNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value.length > 20) {
      return;
    }
    setAccountName(evt.target.value);
  };

  const onBalanceChange = (values: NumberFormatValues) => {
    setAccountBalance(values.value);
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!accountName) {
      toast.error(t("accountError"));
      return;
    }
    if (!accountBalance) {
      toast.error(t("balanceError"));
      return;
    }
    const account: Account = {
      id: uuidv4(),
      group: "user",
      name: accountName,
      balance: parseFloat(accountBalance),
      createdAt: Timestamp.now(),
    };
    setAccountCreating(true);

    try {
      await createAccount(currentUser?.uid, account);
      setAccountState((prev) => ({
        ...prev,
        accounts: [...prev.accounts, account],
      }));
      setOpen(false);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    setAccountCreating(false);
  };

  return (
    <Modal onClose={() => setOpen(false)}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("addAccount")}</h2>
        <CloseButton onClose={() => setOpen(false)} />
        <form onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <input
              className={`${styles.input} ${accountName ? styles.inputActive : ""}`}
              id="name"
              placeholder={t("name").toString()}
              value={accountName}
              onChange={onAccountNameChange}
              onFocus={() => setAccountLengthVisible(true)}
              onBlur={() => setAccountLengthVisible(false)}
            />
            {accountName && (
              <motion.label
                className={styles.label}
                htmlFor="name"
                variants={INPUT_LABEL_VARIANTS}
                initial="hidden"
                animate="visible"
              >
                {t("name")}
              </motion.label>
            )}
            <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
              {accountLengthVisible && (
                <motion.span
                  className={styles.inputLength}
                  variants={INPUT_LENGTH_VARIANTS}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {20 - accountName.length}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div className={styles.inputWrapper}>
            <NumericFormat
              className={`${styles.input} ${accountBalance ? styles.inputActive : ""}`}
              id="balance"
              placeholder={t("startingBalance")}
              thousandSeparator=" "
              decimalScale={2}
              maxLength={13}
              allowNegative={false}
              value={parseFloat(accountBalance)}
              onValueChange={onBalanceChange}
            />
            {accountBalance && (
              <motion.label
                className={styles.label}
                htmlFor="balance"
                variants={INPUT_LABEL_VARIANTS}
                initial="hidden"
                animate="visible"
              >
                {t("startingBalance")}
              </motion.label>
            )}
            <span className={styles.currency}>USD ($)</span>
          </div>
          <button
            className={styles.submitButton}
            type="submit"
            disabled={accountCreating}
          >
            {accountCreating ? <Spinner /> : t("save")}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateAccount;
