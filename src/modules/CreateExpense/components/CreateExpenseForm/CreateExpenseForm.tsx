import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { uuidv4 } from "@firebase/util";
import { Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import {
  AccountSelect,
  AmountInput,
  CategoryInput,
  CategorySelect,
  DateInput,
  TextInput,
} from "components";
import useTransactionForm from "hooks/useTransactionForm";
import { Button } from "ui";
import { useGetAccountsQuery } from "app/services/accountApi";
import { useCreateTransactionMutation } from "app/services/transactionApi";
import { auth } from "app/config";
import { setCurrencySymbol } from "utils/sumUtils";
import { convertCurrency } from "utils/sumUtils";
import { Transaction } from "types";

interface CreateExpenseFormProps {
  onClose: () => void;
}

const CreateExpenseForm: React.FC<CreateExpenseFormProps> = ({ onClose }) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const { data: accounts = [] } = useGetAccountsQuery({ userId: currentUser?.uid! });

  const [createTransaction, { isLoading }] = useCreateTransactionMutation();

  const {
    formState: { fromAccount, amount, category, date, comment },
    handleChangeFromAccount,
    handleChangeCategory,
    handleChangeAmount,
    handleChangeCurrency,
    handleChangeDate,
    handleChangeComment,
  } = useTransactionForm();

  const [categoryInputVisible, setCategoryInputVisible] = useState(false);

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    const currentAccount = accounts.find((account) => account.id === fromAccount?.id);

    if (!currentUser) {
      return;
    }
    if (!currentAccount || !fromAccount) {
      toast.error(t("accountSelectedError"));
      return;
    }
    if (!amount) {
      toast.error(t("sumError"));
      return;
    }
    if (!category) {
      toast.error(t("categorySelectedError"));
      return;
    }
    if (!date) {
      toast.error(t("dateError"));
      return;
    }
    const convertedAmount = convertCurrency(amount.value, {
      accountCurrency: currentAccount.currency,
      currency: amount.currency.id,
    });
    const formattedComment = comment.trim();

    if (currentAccount.balance - convertedAmount < 0) {
      toast.error(t("insufficientFunds"));
      return;
    }
    const transaction: Transaction = {
      id: uuidv4(),
      type: "expense",
      amount: -convertedAmount,
      currency: amount.currency.id,
      category: category.label,
      accountId: fromAccount.id,
      accountName: fromAccount.label,
      accountAmount: currentAccount.balance - convertedAmount,
      accountCurrency: fromAccount.currency!,
      comment: formattedComment ? formattedComment : null,
      createdAt: Timestamp.fromDate(date),
    };
    try {
      await createTransaction({
        userId: currentUser.uid,
        transaction,
      }).unwrap();
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
      <AccountSelect
        label={t("fromAccount")}
        value={fromAccount}
        onChange={handleChangeFromAccount}
      />
      <AmountInput
        label={`${t("sum")}, ${setCurrencySymbol(amount.currency.id)}`}
        value={amount.value}
        onValueChange={handleChangeAmount}
        currency={amount.currency}
        onCurrencyChange={handleChangeCurrency}
      />
      <>
        {categoryInputVisible ? (
          <CategoryInput
            type="expense"
            onChangeCategory={handleChangeCategory}
            onClose={() => setCategoryInputVisible(false)}
          />
        ) : (
          <CategorySelect
            type="expense"
            value={category}
            onChange={handleChangeCategory}
            onOpenCategoryInput={() => setCategoryInputVisible(true)}
          />
        )}
      </>
      <DateInput label={t("expenseDate")} date={date} onChange={handleChangeDate} />
      <TextInput
        label={t("leaveComment")}
        maxLength={60}
        value={comment}
        onChange={handleChangeComment}
      />
      <Button type="submit" variant="orange" loading={isLoading}>
        {t("addExpense")}
      </Button>
    </form>
  );
};

export default CreateExpenseForm;
