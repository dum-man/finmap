import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { uuidv4 } from "@firebase/util";
import { Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { NumberFormatValues } from "react-number-format";
import { AccountSelect, AmountInput, DateInput, TextInput } from "../../../../components";
import { Button } from "../../../../ui";
import { useCreateTransferMutation } from "../../../../app/services/transferApi";
import { useGetAccountsQuery } from "../../../../app/services/accountApi";
import { auth } from "../../../../firebase";
import { SelectOption, Transfer } from "../../../../types";

interface CreateTransferFormProps {
  onClose: () => void;
}

const CreateTransferForm: React.FC<CreateTransferFormProps> = ({ onClose }) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const { data: accounts = [] } = useGetAccountsQuery(currentUser?.uid as string);
  const [createTransfer, { isLoading }] = useCreateTransferMutation();

  const [transferDate, setTransferDate] = useState(new Date());
  const [selectedFromAccount, setSelectedFromAccount] = useState<SelectOption | null>(
    null
  );
  const [selectedToAccount, setSelectedToAccount] = useState<SelectOption | null>(null);
  const [transferAmount, setTransferAmount] = useState("");
  const [transferComment, setTransferComment] = useState("");

  const onSelectFromAccount = (option: SelectOption) => {
    setSelectedFromAccount(option);
  };

  const onSelectToAccount = (option: SelectOption) => {
    setSelectedToAccount(option);
  };

  const onAmountChange = (values: NumberFormatValues) => {
    setTransferAmount(values.value);
  };

  const onCommentChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value.length > 60) {
      return;
    }
    setTransferComment(evt.target.value);
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!currentUser) {
      return;
    }

    const fromAccount = accounts?.find(
      (account) => account.id === selectedFromAccount?.id
    );
    const toAccount = accounts.find((account) => account.id === selectedToAccount?.id);

    if (!transferDate) {
      toast.error(t("dateError"));
      return;
    }
    if (!fromAccount || !toAccount) {
      toast.error(t("accountSelectedError"));
      return;
    }
    if (fromAccount.id === toAccount.id) {
      toast.error("Select different accounts");
      return;
    }
    if (!transferAmount) {
      toast.error(t("sumError"));
      return;
    }
    const formattedTransferAmount = parseFloat(transferAmount);
    const formattedTransferComment = transferComment.trim();

    if (fromAccount.balance - formattedTransferAmount < 0) {
      toast.error(t("insufficientFunds"));
      return;
    }
    const transfer: Transfer = {
      id: uuidv4(),
      amount: formattedTransferAmount,
      comment: formattedTransferComment ? formattedTransferComment : null,
      createdAt: Timestamp.fromDate(transferDate),
      fromAccount: {
        id: fromAccount.id,
        name: fromAccount.name,
        balance: fromAccount.balance - formattedTransferAmount,
      },
      toAccount: {
        id: toAccount.id,
        name: toAccount.name,
        balance: toAccount.balance + formattedTransferAmount,
      },
    };
    try {
      await createTransfer({ userId: currentUser.uid, transfer }).unwrap();
      onClose();
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DateInput
        placeholder={t("transferDate")}
        date={transferDate}
        setDate={setTransferDate}
      />
      <AccountSelect
        placeholder={t("fromAccount")}
        value={selectedFromAccount}
        onChange={onSelectFromAccount}
      />
      <AccountSelect
        placeholder={t("toAccount")}
        value={selectedToAccount}
        onChange={onSelectToAccount}
      />
      <AmountInput
        placeholder={`${t("sum")}, $`}
        value={transferAmount}
        onValueChange={onAmountChange}
      />
      <TextInput
        id="comment"
        placeholder={t("leaveComment")}
        maxLength={60}
        value={transferComment}
        onChange={onCommentChange}
      />
      <Button type="submit" variant="black" loading={isLoading}>
        {t("addTransfer")}
      </Button>
    </form>
  );
};

export default CreateTransferForm;
