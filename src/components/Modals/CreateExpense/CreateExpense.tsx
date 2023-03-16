import { useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Timestamp } from "firebase/firestore";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence, motion } from "framer-motion";
import { NumberFormatValues, NumericFormat } from "react-number-format";
import toast from "react-hot-toast";
import { GoPlus } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { BsCheckLg } from "react-icons/bs";
import CloseButton from "../../UI/CloseButton/CloseButton";
import Modal from "../../UI/Modal/Modal";
import Datepicker from "../../UI/Datepicker/Datepicker";
import Select from "../../UI/Select/Select";
import Spinner from "../../UI/Spinner/Spinner";
import { createExpenseTransaction } from "../../../app/service/transactionsService";
import { createCategory } from "../../../app/service/categoriesService";
import { accountsState } from "../../../app/atoms/accountsAtom";
import { categoriesState } from "../../../app/atoms/categoriesAtom";
import { transactionsState } from "../../../app/atoms/transactionsAtom";
import { setFormattedDateTime } from "../../../utils/dateUtils";
import { auth } from "../../../app/firebase";
import { INPUT_LABEL_VARIANTS, INPUT_LENGTH_VARIANTS } from "../../../app/constants";
import { Category, SelectOption, Transaction } from "../../../types";
import styles from "./Modal.module.scss";

interface CreateExpenseProps {
  setOpen: (open: boolean) => void;
}

const CreateExpense: React.FC<CreateExpenseProps> = ({ setOpen }) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const setTransactionsStateValue = useSetRecoilState(transactionsState);
  const [{ accounts }, setAccountStateValue] = useRecoilState(accountsState);
  const [{ categories }, setCategoriesStateValue] = useRecoilState(categoriesState);

  const expenseOptions = useMemo(() => {
    return categories.expense.map((category) => ({
      id: category.id,
      group: category.group,
      label: category.label,
    }));
  }, [categories.expense]);

  const accountOptions = useMemo(() => {
    return accounts.map((account) => ({
      id: account.id,
      group: account.group,
      label: account.name,
    }));
  }, [accounts]);

  const [selectedAccount, setSelectedAccount] = useState<SelectOption | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<SelectOption | null>(null);
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [transactionComment, setTransactionComment] = useState("");
  const [commentLengthVisible, setCommentLengthVisible] = useState(false);
  const [categoryInputVisible, setCategoryInputVisible] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryCreating, setCategoryCreating] = useState(false);
  const [transactionCreating, setTransactionCreating] = useState(false);
  const [datepickerOpen, setDatepickerOpen] = useState(false);

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

  const onChangeCategoryName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value.length > 20) {
      return;
    }
    setCategoryName(evt.target.value);
  };

  const onOpenCategoryInput = () => {
    setCategoryInputVisible(true);
    setSelectedCategory(null);
  };

  const onCloseCategoryInput = () => {
    setCategoryInputVisible(false);
    setCategoryName("");
  };

  const handleCreateCategory = async () => {
    const formattedCategoryName = categoryName.trim();

    if (!formattedCategoryName) {
      toast.error(t("categoryNameError"));
      return;
    }
    const category: Category = {
      id: uuidv4(),
      group: "user",
      type: "expense",
      label: categoryName,
      createdAt: Timestamp.now(),
    };
    setCategoryCreating(true);

    try {
      await createCategory(currentUser?.uid, category);
      setCategoriesStateValue((prev) => ({
        ...prev,
        categories: {
          ...prev.categories,
          expense: [...prev.categories.expense, category],
        },
      }));
      onCloseCategoryInput();
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    setCategoryCreating(false);
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

    if (currentAccount.balance - formattedTransactionAmount < 0) {
      toast.error(t("insufficientFunds"));
      return;
    }
    const transaction: Transaction = {
      id: uuidv4(),
      type: "expense",
      amount: formattedTransactionAmount,
      category: selectedCategory.label,
      accountId: selectedAccount.id,
      accountName: selectedAccount.label,
      accountAmount: currentAccount.balance - formattedTransactionAmount,
      comment: formattedTransactionComment ? formattedTransactionComment : null,
      createdAt: Timestamp.fromDate(transactionDate),
    };
    setTransactionCreating(true);
    try {
      await createExpenseTransaction(currentUser?.uid, transaction);
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
          balance: updatedAccount.balance - formattedTransactionAmount,
        };
        return {
          ...prev,
          accounts: updatedAccounts,
        };
      });
      setOpen(false);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    setTransactionCreating(false);
  };

  return (
    <Modal onClose={() => setOpen(false)}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("newExpense")}</h2>
        <CloseButton onClose={() => setOpen(false)} />
        <form onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <Select
              placeholder={t("fromAccount").toString()}
              active={!!selectedAccount}
              value={selectedAccount}
              options={accountOptions}
              onChange={onSelectAccount}
            />
            {selectedAccount && (
              <motion.span
                className={styles.label}
                variants={INPUT_LABEL_VARIANTS}
                initial="hidden"
                animate="visible"
              >
                {t("fromAccount")}
              </motion.span>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <NumericFormat
              className={`${styles.input} ${transactionAmount ? styles.inputActive : ""}`}
              id="sum"
              placeholder={`${t("sum")}, $`}
              thousandSeparator=" "
              decimalScale={2}
              maxLength={13}
              allowNegative={false}
              value={parseFloat(transactionAmount)}
              onValueChange={onAmountChange}
            />
            {transactionAmount && (
              <motion.label
                className={styles.label}
                htmlFor="sum"
                variants={INPUT_LABEL_VARIANTS}
                initial="hidden"
                animate="visible"
              >
                {`${t("sum")}, $`}
              </motion.label>
            )}
            <span className={styles.currency}>USD ($)</span>
          </div>
          <div className={styles.inputWrapper}>
            {categoryInputVisible ? (
              <>
                <input
                  className={`${styles.input} ${categoryName ? styles.inputActive : ""}`}
                  placeholder={t("categoryName").toString()}
                  disabled={categoryCreating}
                  value={categoryName}
                  onChange={onChangeCategoryName}
                />
                {categoryName && (
                  <motion.span
                    className={styles.label}
                    variants={INPUT_LABEL_VARIANTS}
                    initial="hidden"
                    animate="visible"
                  >
                    {t("categoryName")}
                  </motion.span>
                )}
                <div className={styles.categoryButtons}>
                  <button
                    className={styles.iconButton}
                    type="button"
                    disabled={categoryCreating}
                  >
                    <BsCheckLg
                      className={styles.submitIcon}
                      onClick={handleCreateCategory}
                    />
                  </button>
                  <button
                    className={styles.iconButton}
                    type="button"
                    disabled={categoryCreating}
                    onClick={onCloseCategoryInput}
                  >
                    <IoClose />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Select
                  placeholder={t("category").toString()}
                  active={!!selectedCategory}
                  options={expenseOptions}
                  value={selectedCategory}
                  onChange={onSelectCategory}
                />
                {selectedCategory && (
                  <motion.span
                    className={styles.label}
                    variants={INPUT_LABEL_VARIANTS}
                    initial="hidden"
                    animate="visible"
                  >
                    {t("category")}
                  </motion.span>
                )}
                <button
                  className={`${styles.iconButton} ${styles.addButton}`}
                  type="button"
                  onClick={onOpenCategoryInput}
                >
                  <GoPlus />
                </button>
              </>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <div
              className={`${styles.input} ${styles.datepicker} ${
                datepickerOpen ? styles.focused : ""
              }`}
              onClick={() => setDatepickerOpen(true)}
            >
              {setFormattedDateTime(transactionDate)}
            </div>
            <motion.label
              className={styles.label}
              htmlFor="date"
              variants={INPUT_LABEL_VARIANTS}
              initial="hidden"
              animate="visible"
            >
              {t("expenseDate")}
            </motion.label>
            <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
              {datepickerOpen && (
                <Datepicker
                  value={transactionDate}
                  onChange={setTransactionDate}
                  onClickDay={() => setDatepickerOpen(false)}
                  onClose={() => setDatepickerOpen(false)}
                />
              )}
            </AnimatePresence>
          </div>
          <div className={styles.inputWrapper}>
            <input
              className={`${styles.input} ${styles.commentInput} ${
                transactionComment ? styles.inputActive : ""
              }`}
              id="comment"
              placeholder={t("leaveComment").toString()}
              value={transactionComment}
              onChange={onCommentChange}
              onFocus={() => setCommentLengthVisible(true)}
              onBlur={() => setCommentLengthVisible(false)}
            />
            {transactionComment && (
              <motion.label
                className={styles.label}
                htmlFor="comment"
                variants={INPUT_LABEL_VARIANTS}
                initial="hidden"
                animate="visible"
              >
                {t("leaveComment")}
              </motion.label>
            )}
            <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
              {commentLengthVisible && (
                <motion.span
                  className={styles.inputLength}
                  variants={INPUT_LENGTH_VARIANTS}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {60 - transactionComment.length}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <button
            className={styles.submitButton}
            type="submit"
            disabled={transactionCreating}
          >
            {transactionCreating ? <Spinner /> : t("addExpense")}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateExpense;
