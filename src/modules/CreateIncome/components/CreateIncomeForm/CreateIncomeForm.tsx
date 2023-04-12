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
} from "../../../../components";
import { Button } from "../../../../ui";
import useTransactionForm from "../../../../hooks/useTransactionForm";
import { useGetAccountsQuery } from "../../../../app/services/accountApi";
import { useCreateTransactionMutation } from "../../../../app/services/transactionApi";
import { auth } from "../../../../firebase";
import { Transaction } from "../../../../types";

interface CreateIncomeFormProps {
  onClose: () => void;
}

const CreateIncomeForm: React.FC<CreateIncomeFormProps> = ({ onClose }) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const { data: accounts = [] } = useGetAccountsQuery(currentUser?.uid as string);

  const [createTransaction, { isLoading }] = useCreateTransactionMutation();

  const {
    formState: { toAccount, category, amount, date, comment },
    onChangeToAccount,
    onChangeCategory,
    onChangeAmount,
    onChangeDate,
    onChangeComment,
  } = useTransactionForm();

  const [categoryInputVisible, setCategoryInputVisible] = useState(false);

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    const currentAccount = accounts.find((account) => account.id === toAccount?.id);

    if (!currentUser) {
      return;
    }
    if (!currentAccount || !toAccount) {
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
    const formattedAmount = parseFloat(amount);
    const formattedComment = comment.trim();

    const transaction: Transaction = {
      id: uuidv4(),
      type: "income",
      amount: formattedAmount,
      category: category.label,
      accountId: toAccount.id,
      accountName: toAccount.label,
      accountAmount: currentAccount.balance + formattedAmount,
      comment: formattedComment ? formattedComment : null,
      createdAt: Timestamp.fromDate(date),
    };
    try {
      await createTransaction({
        userId: currentUser.uid,
        transaction,
      }).unwrap();
      onClose();
    } catch (error: any) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <>
        {categoryInputVisible ? (
          <CategoryInput
            type="income"
            onChangeCategory={onChangeCategory}
            onClose={() => setCategoryInputVisible(false)}
          />
        ) : (
          <CategorySelect
            type="income"
            value={category}
            onChange={onChangeCategory}
            onOpenCategoryInput={() => setCategoryInputVisible(true)}
          />
        )}
      </>
      <DateInput placeholder={t("incomeDate")} date={date} onChange={onChangeDate} />
      <TextInput
        id="comment"
        name="transactionComment"
        placeholder={t("leaveComment")}
        maxLength={60}
        value={comment}
        onChange={onChangeComment}
      />
      <Button type="submit" loading={isLoading}>
        {t("addIncome")}
      </Button>
    </form>
  );
};

export default CreateIncomeForm;
