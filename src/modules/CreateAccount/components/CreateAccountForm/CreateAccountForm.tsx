import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { useSetRecoilState } from "recoil";
import { uuidv4 } from "@firebase/util";
import { Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { NumberFormatValues } from "react-number-format";
import { AmountInput, TextInput } from "../../../../components";
import { Button } from "../../../../ui";
import { auth } from "../../../../firebase";
import { accountsState } from "../../../../app/atoms/accountsAtom";
import { createAccount } from "../../api";
import { Account } from "../../../../types";

interface CreateAccountFormProps {
  onClose: () => void;
}

const CreateAccountForm: React.FC<CreateAccountFormProps> = ({ onClose }) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const setAccountState = useSetRecoilState(accountsState);

  const [accountName, setAccountName] = useState("");
  const [accountBalance, setAccountBalance] = useState("0");
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
