import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { uuidv4 } from "@firebase/util";
import { Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { NumberFormatValues } from "react-number-format";
import {
  AccountSelect,
  AmountInput,
  CategoryInput,
  CategorySelect,
  DateInput,
  TextInput,
} from "../../../../components";
import { Button } from "../../../../ui";
import { useGetAccountsQuery } from "../../../../app/services/accountApi";
import { useCreateTransactionMutation } from "../../../../app/services/transactionApi";
import { auth } from "../../../../firebase";
import { SelectOption, Transaction } from "../../../../types";

interface CreateIncomeFormProps {
  onClose: () => void;
}

const CreateIncomeForm: React.FC<CreateIncomeFormProps> = ({ onClose }) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const { data: accounts = [] } = useGetAccountsQuery(currentUser?.uid as string);

  const [createTransaction, { isLoading }] = useCreateTransactionMutation();

  const [selectedAccount, setSelectedAccount] = useState<SelectOption | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<SelectOption | null>(null);
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [transactionComment, setTransactionComment] = useState("");

  const [categoryInputVisible, setCategoryInputVisible] = useState(false);

  const onSelectAccount = (option: SelectOption) => {
    setSelectedAccount(option);
  };

  const onSelectCategory = (option: SelectOption) => {
    setSelectedCategory(option);
  };

  const onAmountChange = (values: NumberFormatValues) => {
    setTransactionAmount(values.value);
  };

  const onCommentChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value.length > 60) {
      return;
    }
    setTransactionComment(evt.target.value);
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    const currentAccount = accounts.find((account) => account.id === selectedAccount?.id);

    if (!currentUser) {
      return;
    }
    if (!currentAccount || !selectedAccount) {
      toast.error(t("accountSelectedError"));
      return;
    }
    if (!transactionAmount) {
      toast.error(t("sumError"));
      return;
    }
    if (!selectedCategory) {
      toast.error(t("categorySelectedError"));
      return;
    }
    if (!transactionDate) {
      toast.error(t("dateError"));
      return;
    }
    const formattedTransactionAmount = parseFloat(transactionAmount);
    const formattedTransactionComment = transactionComment.trim();

    const transaction: Transaction = {
      id: uuidv4(),
      type: "income",
      amount: formattedTransactionAmount,
      category: selectedCategory.label,
      accountId: selectedAccount.id,
      accountName: selectedAccount.label,
      accountAmount: currentAccount.balance + formattedTransactionAmount,
      comment: formattedTransactionComment ? formattedTransactionComment : null,
      createdAt: Timestamp.fromDate(transactionDate),
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
        value={selectedAccount}
        onChange={onSelectAccount}
      />
      <AmountInput
        placeholder={`${t("sum")}, $`}
        value={transactionAmount}
        onValueChange={onAmountChange}
      />
      <>
        {categoryInputVisible ? (
          <CategoryInput
            type="income"
            onSelectCategory={onSelectCategory}
            onClose={() => setCategoryInputVisible(false)}
          />
        ) : (
          <CategorySelect
            type="income"
            value={selectedCategory}
            onChange={onSelectCategory}
            onOpenCategoryInput={() => setCategoryInputVisible(true)}
          />
        )}
      </>
      <DateInput
        placeholder={t("incomeDate")}
        date={transactionDate}
        setDate={setTransactionDate}
      />
      <TextInput
        id="comment"
        placeholder={t("leaveComment")}
        maxLength={60}
        value={transactionComment}
        onChange={onCommentChange}
      />
      <Button type="submit" loading={isLoading}>
        {t("addIncome")}
      </Button>
    </form>
  );
};

export default CreateIncomeForm;
