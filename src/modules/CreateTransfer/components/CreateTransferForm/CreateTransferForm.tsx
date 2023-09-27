import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { uuidv4 } from "@firebase/util";
import { Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { AccountSelect, AmountInput, DateInput, TextInput } from "components";
import { Button } from "ui";
import useTransactionForm from "hooks/useTransactionForm";
import { useCreateTransferMutation } from "app/services/transferApi";
import { useGetAccountsQuery } from "app/services/accountApi";
import { auth } from "app/config";
import { convertCurrency, setCurrencySymbol } from "utils/sumUtils";
import { Transfer } from "types";

interface CreateTransferFormProps {
  onClose: () => void;
}

const CreateTransferForm: React.FC<CreateTransferFormProps> = ({ onClose }) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const { data: accounts = [] } = useGetAccountsQuery({ userId: currentUser?.uid! });

  const [createTransfer, { isLoading }] = useCreateTransferMutation();

  const {
    formState: { fromAccount, toAccount, amount, date, comment },
    handleChangeToAccount,
    handleChangeFromAccount,
    handleChangeAmount,
    handleChangeCurrency,
    handleChangeDate,
    handleChangeComment,
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

    const convertedFromAccountAmount = convertCurrency(amount.value, {
      accountCurrency: fromAccountData.currency,
      currency: amount.currency.id,
    });

    const convertedToAccountAmount = convertCurrency(amount.value, {
      accountCurrency: toAccountData.currency,
      currency: amount.currency.id,
    });
    const formattedComment = comment.trim();

    if (fromAccountData.balance - convertedFromAccountAmount < 0) {
      toast.error(t("insufficientFunds"));
      return;
    }
    const transfer: Transfer = {
      id: uuidv4(),
      amount: convertedFromAccountAmount,
      currency: amount.currency.id,
      comment: formattedComment ? formattedComment : null,
      createdAt: Timestamp.fromDate(date),
      fromAccount: {
        id: fromAccountData.id,
        name: fromAccountData.name,
        balance: fromAccountData.balance - convertedFromAccountAmount,
        currency: fromAccount?.currency!,
      },
      toAccount: {
        id: toAccountData.id,
        name: toAccountData.name,
        balance: toAccountData.balance + convertedToAccountAmount,
        currency: toAccount?.currency!,
      },
    };
    try {
      await createTransfer({ userId: currentUser.uid, transfer }).unwrap();
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DateInput label={t("transferDate")} date={date} onChange={handleChangeDate} />
      <AccountSelect
        label={t("fromAccount")}
        value={fromAccount}
        onChange={handleChangeFromAccount}
      />
      <AccountSelect
        label={t("toAccount")}
        value={toAccount}
        onChange={handleChangeToAccount}
      />
      <AmountInput
        label={`${t("sum")}, ${setCurrencySymbol(amount.currency.id)}`}
        value={amount.value}
        onValueChange={handleChangeAmount}
        currency={amount.currency}
        onCurrencyChange={handleChangeCurrency}
      />
      <TextInput
        label={t("leaveComment")}
        maxLength={60}
        value={comment}
        onChange={handleChangeComment}
      />
      <Button type="submit" variant="black" loading={isLoading}>
        {t("addTransfer")}
      </Button>
    </form>
  );
};

export default CreateTransferForm;
