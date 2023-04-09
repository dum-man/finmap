import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { uuidv4 } from "@firebase/util";
import { Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { NumberFormatValues } from "react-number-format";
import { BsArrowRight, BsCheck } from "react-icons/bs";
import { AmountInput, TextInput } from "../../../../components";
import {
  useCreateAccountMutation,
  useLazyCheckAccountExistsQuery,
} from "../../../../app/services/accountApi";
import { auth } from "../../../../firebase";
import { INPUT_VARIANTS } from "../../constants";
import { Account } from "../../../../types";
import styles from "./CreateAccountForm.module.scss";

interface CreateAccountFormProps {
  onClose: () => void;
}

const CreateAccountForm: React.FC<CreateAccountFormProps> = ({ onClose }) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const [checkAccountExists] = useLazyCheckAccountExistsQuery();
  const [createAccount] = useCreateAccountMutation();

  const [accountName, setAccountName] = useState("");
  const [accountBalance, setAccountBalance] = useState("0");

  const [currentInput, setCurrentInput] = useState("name");
  const [accountCreating, setAccountCreating] = useState(false);

  const onAccountNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setAccountName(evt.target.value);
  };

  const onBalanceChange = (values: NumberFormatValues) => {
    setAccountBalance(values.value);
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!currentUser) {
      return;
    }
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
      const accountExists = await checkAccountExists({
        userId: currentUser.uid,
        name: account.name,
      }).unwrap();
      if (accountExists) {
        setCurrentInput("name");
        throw new Error(`You already have "${account.name}" account`);
      }
      await createAccount({ userId: currentUser.uid, account }).unwrap();
      onClose();
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    setAccountCreating(false);
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      {currentInput === "name" && (
        <motion.div
          className={styles.inputWrapper}
          variants={INPUT_VARIANTS}
          initial="hidden"
          animate="visible"
        >
          <TextInput
            id="name"
            placeholder={t("name")}
            maxLength={20}
            value={accountName}
            onChange={onAccountNameChange}
          />
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setCurrentInput("amount")}
          >
            <BsArrowRight />
          </button>
        </motion.div>
      )}
      {currentInput === "amount" && (
        <motion.div
          className={styles.inputWrapper}
          variants={INPUT_VARIANTS}
          initial="hidden"
          animate="visible"
        >
          <AmountInput
            currency={false}
            placeholder={t("startingBalance")}
            value={accountBalance}
            onValueChange={onBalanceChange}
          />
          <button type="submit" className={styles.iconButton} disabled={accountCreating}>
            <BsCheck className={styles.submitIcon} />
          </button>
        </motion.div>
      )}
    </form>
  );
};

export default CreateAccountForm;
