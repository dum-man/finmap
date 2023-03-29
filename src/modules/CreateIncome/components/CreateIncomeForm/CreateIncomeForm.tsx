import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { useRecoilState, useSetRecoilState } from "recoil";
import { uuidv4 } from "@firebase/util";
import { Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { NumberFormatValues } from "react-number-format";
import {
  AccountSelect,
  AmountInput,
  CategorySelect,
  DateInput,
  TextInput,
} from "../../../../components";
import { Button } from "../../../../ui";
import { accountsState } from "../../../../app/atoms/accountsAtom";
import { transactionsState } from "../../../../app/atoms/transactionsAtom";
import { createIncomeTransaction } from "../../api";
import { auth } from "../../../../firebase";
import { SelectOption, Transaction } from "../../../../types";

interface CreateIncomeFormProps {
  onClose: () => void;
}

const CreateIncomeForm: React.FC<CreateIncomeFormProps> = ({ onClose }) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const setTransactionsStateValue = useSetRecoilState(transactionsState);
  const [{ accounts }, setAccountStateValue] = useRecoilState(accountsState);

  const [selectedAccount, setSelectedAccount] = useState<SelectOption | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<SelectOption | null>(null);
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [transactionComment, setTransactionComment] = useState("");
  const [transactionCreating, setTransactionCreating] = useState(false);

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
    setTransactionCreating(true);

    try {
      await createIncomeTransaction(currentUser?.uid, transaction);
      setTransactionsStateValue((prev) => ({
        ...prev,
        transactions: [transaction, ...prev.transactions],
      }));
      setAccountStateValue((prev) => {
        const updatedAccounts = [...prev.accounts];
        const updatedAccountIndex = updatedAccounts.findIndex(
          (account) => account.id === currentAccount.id
        );
        const updatedAccount = updatedAccounts[updatedAccountIndex];
        updatedAccounts[updatedAccountIndex] = {
          ...updatedAccount,
          balance: updatedAccount.balance + formattedTransactionAmount,
        };
        return {
          ...prev,
          accounts: updatedAccounts,
        };
      });
      onClose();
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    setTransactionCreating(false);
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
      <CategorySelect
        type="income"
        value={selectedCategory}
        onChange={onSelectCategory}
      />
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
      <Button type="submit" loading={transactionCreating}>
        {t("addIncome")}
      </Button>
    </form>
  );
};

export default CreateIncomeForm;
