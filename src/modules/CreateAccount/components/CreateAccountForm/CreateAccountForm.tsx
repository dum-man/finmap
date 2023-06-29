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
  const [accountBalance, onBalanceChange] = useAmountInput("0");

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
    <form onSubmit={handleSubmit}>
      <TextInput
        id="name"
        placeholder={t("name")}
        maxLength={20}
        value={accountName}
        onChange={onAccountNameChange}
      />
      <AmountInput
        placeholder={t("startingBalance")}
        value={accountBalance}
        onValueChange={onBalanceChange}
      />
      <Button type="submit" loading={accountCreating}>
        {t("save")}
      </Button>
    </form>
  );
};

export default CreateAccountForm;
