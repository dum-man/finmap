import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { uuidv4 } from "@firebase/util";
import { Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { AccountSelect, AmountInput, DateInput, TextInput } from "../../../../components";
import { Button } from "../../../../ui";
import useTransactionForm from "../../../../hooks/useTransactionForm";
import { useCreateTransferMutation } from "../../../../app/services/transferApi";
import { useGetAccountsQuery } from "../../../../app/services/accountApi";
import { auth } from "../../../../firebase";
import { Transfer } from "../../../../types";

interface CreateTransferFormProps {
  onClose: () => void;
}

const CreateTransferForm: React.FC<CreateTransferFormProps> = ({ onClose }) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const { data: accounts = [] } = useGetAccountsQuery(currentUser?.uid as string);
  const [createTransfer, { isLoading }] = useCreateTransferMutation();

  const {
    formState: { fromAccount, toAccount, amount, date, comment },
    onChangeToAccount,
    onChangeFromAccount,
    onChangeAmount,
    onChangeDate,
    onChangeComment,
  } = useTransactionForm();

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!currentUser) {
      return;
    }

    const fromAccountData = accounts.find((account) => account.id === fromAccount?.id);
    const toAccountData = accounts.find((account) => account.id === toAccount?.id);

    if (!date) {
      toast.error(t("dateError"));
      return;
    }
    if (!fromAccountData || !toAccountData) {
      toast.error(t("accountSelectedError"));
      return;
    }
    if (fromAccountData.id === toAccountData.id) {
      toast.error("Select different accounts");
      return;
    }
    if (!amount) {
      toast.error(t("sumError"));
      return;
    }
    const formattedAmount = parseFloat(amount);
    const formattedComment = comment.trim();

    if (fromAccountData.balance - formattedAmount < 0) {
      toast.error(t("insufficientFunds"));
      return;
    }
    const transfer: Transfer = {
      id: uuidv4(),
      amount: formattedAmount,
      comment: formattedComment ? formattedComment : null,
      createdAt: Timestamp.fromDate(date),
      fromAccount: {
        id: fromAccountData.id,
        name: fromAccountData.name,
        balance: fromAccountData.balance - formattedAmount,
      },
      toAccount: {
        id: toAccountData.id,
        name: toAccountData.name,
        balance: toAccountData.balance + formattedAmount,
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
      <DateInput placeholder={t("transferDate")} date={date} onChange={onChangeDate} />
      <AccountSelect
        placeholder={t("fromAccount")}
        value={fromAccount}
        onChange={onChangeFromAccount}
      />
      <AccountSelect
        placeholder={t("toAccount")}
        value={toAccount}
        onChange={onChangeToAccount}
      />
      <AmountInput
        placeholder={`${t("sum")}, $`}
        value={amount}
        onValueChange={onChangeAmount}
      />
      <TextInput
        id="comment"
        placeholder={t("leaveComment")}
        maxLength={60}
        value={comment}
        onChange={onChangeComment}
      />
      <Button type="submit" variant="black" loading={isLoading}>
        {t("addTransfer")}
      </Button>
    </form>
  );
};

export default CreateTransferForm;
