import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { uuidv4 } from "@firebase/util";
import { Timestamp } from "firebase/firestore";
import { useStep } from "usehooks-ts";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { BsArrowLeft, BsArrowRight, BsCheck } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { AmountInput, TextInput } from "components";
import { Spinner } from "ui";
import useAmountInput from "hooks/useAmountInput";
import {
  useCreateAccountMutation,
  useLazyCheckAccountExistsQuery,
} from "app/services/accountApi";
import { auth } from "app/config";
import { setInputVariants } from "../../helpers";
import { Account } from "types";
import styles from "./CreateAccountForm.module.scss";

interface CreateAccountFormProps {
  onClose: () => void;
}

const CreateAccountForm: React.FC<CreateAccountFormProps> = ({ onClose }) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const [currentStep, { goToNextStep, goToPrevStep }] = useStep(2);

  const [checkAccountExists] = useLazyCheckAccountExistsQuery();
  const [createAccount] = useCreateAccountMutation();

  const [accountName, setAccountName] = useState("");
  const [accountBalance, onBalanceChange] = useAmountInput("0");

  const [accountCreating, setAccountCreating] = useState(false);

  const onAccountNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setAccountName(evt.target.value);
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (currentStep === 1) {
      goToNextStep();
      return;
    }
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
        goToPrevStep();
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
      {currentStep === 1 && (
        <motion.div
          className={styles.inputWrapper}
          variants={setInputVariants(currentStep !== 1)}
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
          <div className={styles.buttons}>
            <button type="button" className={styles.iconButton} onClick={onClose}>
              <IoClose />
            </button>
            <button
              type="button"
              className={styles.iconButton}
              onClick={() => goToNextStep()}
            >
              <BsArrowRight />
            </button>
          </div>
        </motion.div>
      )}
      {currentStep === 2 && (
        <motion.div
          className={styles.inputWrapper}
          variants={setInputVariants(currentStep === 2)}
          initial="hidden"
          animate="visible"
        >
          <AmountInput
            currency={false}
            placeholder={t("startingBalance")}
            value={accountBalance}
            onValueChange={onBalanceChange}
          />
          <div className={styles.buttons}>
            {!accountCreating ? (
              <>
                <button
                  type="button"
                  className={styles.iconButton}
                  onClick={() => goToPrevStep()}
                >
                  <BsArrowLeft />
                </button>
                <button
                  type="submit"
                  className={styles.iconButton}
                  disabled={accountCreating}
                >
                  <BsCheck className={styles.submitIcon} />
                </button>
              </>
            ) : (
              <Spinner variant="dark" />
            )}
          </div>
        </motion.div>
      )}
    </form>
  );
};

export default CreateAccountForm;
