import { useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Timestamp } from "firebase/firestore";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence, motion } from "framer-motion";
import { NumberFormatValues, NumericFormat } from "react-number-format";
import toast from "react-hot-toast";
import CloseButton from "../../UI/CloseButton/CloseButton";
import Modal from "../../UI/Modal/Modal";
import Datepicker from "../../UI/Datepicker/Datepicker";
import Select from "../../UI/Select/Select";
import Spinner from "../../UI/Spinner/Spinner";
import { createTransfer } from "../../../app/service/transfersService";
import { accountsState } from "../../../app/atoms/accountsAtom";
import { transfersState } from "../../../app/atoms/transfersAtom";
import { setFormattedDateTime } from "../../../utils/dateUtils";
import { auth } from "../../../app/firebase";
import { INPUT_LABEL_VARIANTS, INPUT_LENGTH_VARIANTS } from "../../../app/constants";
import { SelectOption, Transfer } from "../../../types";
import styles from "./Modal.module.scss";

interface CreateTransferProps {
  setOpen: (open: boolean) => void;
}

const CreateTransfer: React.FC<CreateTransferProps> = ({ setOpen }) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const setTransfersStateValue = useSetRecoilState(transfersState);
  const [{ accounts }, setAccountStateValue] = useRecoilState(accountsState);

  const accountOptions = useMemo(() => {
    return accounts.map((account) => ({
      id: account.id,
      group: account.group,
      label: account.name,
    }));
  }, [accounts]);

  const [transferDate, setTransferDate] = useState(new Date());
  const [selectedFromAccount, setSelectedFromAccount] = useState<SelectOption | null>(
    null
  );
  const [selectedToAccount, setSelectedToAccount] = useState<SelectOption | null>(null);
  const [transferAmount, setTransferAmount] = useState("");
  const [transferComment, setTransferComment] = useState("");
  const [commentLengthVisible, setCommentLengthVisible] = useState(false);
  const [transferCreating, setTransferCreating] = useState(false);
  const [datepickerOpen, setDatepickerOpen] = useState(false);

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

    const fromAccount = accounts.find(
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
    setTransferCreating(true);

    try {
      await createTransfer(currentUser?.uid, transfer);
      setTransfersStateValue((prev) => ({
        ...prev,
        transfers: [transfer, ...prev.transfers],
      }));
      setAccountStateValue((prev) => {
        const updatedAccounts = [...prev.accounts];
        const fromUpdatedAccountIndex = updatedAccounts.findIndex(
          (account) => account.id === fromAccount.id
        );
        const toUpdatedAccountIndex = updatedAccounts.findIndex(
          (account) => account.id === toAccount.id
        );

        const fromUpdatedAccount = updatedAccounts[fromUpdatedAccountIndex];
        const toUpdatedAccount = updatedAccounts[toUpdatedAccountIndex];

        updatedAccounts[fromUpdatedAccountIndex] = {
          ...fromUpdatedAccount,
          balance: fromUpdatedAccount.balance - formattedTransferAmount,
        };
        updatedAccounts[toUpdatedAccountIndex] = {
          ...toUpdatedAccount,
          balance: toUpdatedAccount.balance + formattedTransferAmount,
        };
        return {
          ...prev,
          accounts: updatedAccounts,
        };
      });
      setOpen(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
    setTransferCreating(false);
  };

  return (
    <Modal onClose={() => setOpen(false)}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("newTransfer")}</h2>
        <CloseButton onClose={() => setOpen(false)} />
        <form onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <div
              className={`${styles.input} ${styles.datepicker} ${
                datepickerOpen ? styles.focused : ""
              }`}
              onClick={() => setDatepickerOpen(true)}
            >
              {setFormattedDateTime(transferDate)}
            </div>
            <motion.label
              className={styles.label}
              htmlFor="date"
              variants={INPUT_LABEL_VARIANTS}
              initial="hidden"
              animate="visible"
            >
              {t("transferDate")}
            </motion.label>
            <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
              {datepickerOpen && (
                <Datepicker
                  value={transferDate}
                  onChange={setTransferDate}
                  onClickDay={() => setDatepickerOpen(false)}
                  onClose={() => setDatepickerOpen(false)}
                />
              )}
            </AnimatePresence>
          </div>
          <div className={styles.inputWrapper}>
            <Select
              placeholder={t("fromAccount").toString()}
              active={!!selectedFromAccount}
              value={selectedFromAccount}
              options={accountOptions}
              onChange={onSelectFromAccount}
            />
            {selectedFromAccount && (
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
            <Select
              placeholder={t("toAccount").toString()}
              active={!!selectedToAccount}
              value={selectedToAccount}
              options={accountOptions}
              onChange={onSelectToAccount}
            />
            {selectedToAccount && (
              <motion.span
                className={styles.label}
                variants={INPUT_LABEL_VARIANTS}
                initial="hidden"
                animate="visible"
              >
                {t("toAccount")}
              </motion.span>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <NumericFormat
              className={`${styles.input} ${transferAmount ? styles.inputActive : ""}`}
              id="sum"
              placeholder={`${t("sum")}, $`}
              thousandSeparator=" "
              decimalScale={2}
              maxLength={13}
              allowNegative={false}
              value={parseFloat(transferAmount)}
              onValueChange={onAmountChange}
            />
            {transferAmount && (
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
            <input
              className={`${styles.input} ${styles.commentInput} ${
                transferComment ? styles.inputActive : ""
              }`}
              id="comment"
              placeholder={t("leaveComment").toString()}
              value={transferComment}
              onChange={onCommentChange}
              onFocus={() => setCommentLengthVisible(true)}
              onBlur={() => setCommentLengthVisible(false)}
            />
            {transferComment && (
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
                  {60 - transferComment.length}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <button
            className={styles.submitButton}
            type="submit"
            disabled={transferCreating}
          >
            {transferCreating ? <Spinner /> : t("addTransfer")}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateTransfer;
