import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { uuidv4 } from "@firebase/util";
import { Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { AmountInput, TextInput } from "components";
import { Button } from "ui";
import {
  useCreateAccountMutation,
  useLazyCheckAccountExistsQuery,
} from "app/services/accountApi";
import useAmountInput from "hooks/useAmountInput";
import { auth } from "app/config";
import { CURRENCY_OPTIONS } from "app/constants";
import { Account } from "types";

interface CreateAccountFormProps {
  onClose: () => void;
}

const CreateAccountForm: React.FC<CreateAccountFormProps> = ({ onClose }) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

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
      <TextInput
        label={t("name")}
        maxLength={20}
        value={accountName}
        onChange={onAccountNameChange}
      />
      <AmountInput
        label={t("startingBalance")}
        value={amount.value}
        onValueChange={handleChangeAmount}
        currency={amount.currency}
        onCurrencyChange={handleChangeCurrency}
      />
      <Button type="submit" loading={accountCreating}>
        {t("save")}
      </Button>
    </form>
  );
};

export default CreateAccountForm;
