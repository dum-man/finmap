import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { uuidv4 } from "@firebase/util";
import { Timestamp } from "firebase/firestore";
import { useStep } from "usehooks-ts";
import classNames from "classnames";
import toast from "react-hot-toast";
import { BsArrowRight, BsCheck } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { AmountInput, TextInput } from "components";
import useAmountInput from "hooks/useAmountInput";
import {
  useCreateAccountMutation,
  useLazyCheckAccountExistsQuery,
} from "app/services/accountApi";
import { auth } from "app/config";
import { CURRENCY_OPTIONS } from "app/constants";
import { Account } from "types";
import styles from "./CreateAccountForm.module.css";

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
  const { amount, handleChangeAmount, handleChangeCurrency } = useAmountInput({
    value: "0",
    currency: CURRENCY_OPTIONS[0],
  });

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
    if (!amount.value) {
      toast.error(t("balanceError"));
      return;
    }
    const account: Account = {
      id: uuidv4(),
      group: "user",
      name: accountName,
      balance: parseFloat(amount.value),
      currency: amount.currency.id,
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
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message);
      }
    }
    setAccountCreating(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {currentStep === 1 && (
        <div className={styles["input-wrapper"]}>
          <TextInput
            label={t("name")}
            maxLength={20}
            value={accountName}
            onChange={onAccountNameChange}
          />
          <div className={styles["buttons"]}>
            <button
              type="button"
              className={classNames("icon-button", styles["icon-button"])}
              onClick={onClose}
            >
              <IoClose />
            </button>
            <button
              type="button"
              className={classNames("icon-button", styles["icon-button"])}
              onClick={() => goToNextStep()}
            >
              <BsArrowRight />
            </button>
          </div>
        </div>
      )}
      {currentStep === 2 && (
        <div className={styles["input-wrapper"]}>
          <AmountInput
            label={t("startingBalance")}
            value={amount.value}
            onValueChange={handleChangeAmount}
            currency={amount.currency}
            onCurrencyChange={handleChangeCurrency}
          />
          <button
            type="submit"
            className={classNames("icon-button", styles["icon-button"])}
            disabled={accountCreating}
          >
            <BsCheck className={styles["submit-icon"]} />
          </button>
        </div>
      )}
    </form>
  );
};

export default CreateAccountForm;
