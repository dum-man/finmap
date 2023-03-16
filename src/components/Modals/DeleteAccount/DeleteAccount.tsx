import { useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import CloseButton from "../../UI/CloseButton/CloseButton";
import Modal from "../../UI/Modal/Modal";
import Select from "../../UI/Select/Select";
import Spinner from "../../UI/Spinner/Spinner";
import { auth } from "../../../app/firebase";
import { accountsState } from "../../../app/atoms/accountsAtom";
import { deleteAccount } from "../../../app/service/accountsService";
import { INPUT_LABEL_VARIANTS } from "../../../app/constants";
import { SelectOption } from "../../../types";
import styles from "./Modal.module.scss";

interface DeleteAccountProps {
  setOpen: (open: boolean) => void;
}

const DeleteAccount: React.FC<DeleteAccountProps> = ({ setOpen }) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const [{ accounts }, setAccountsStateValue] = useRecoilState(accountsState);

  const accountOptions = useMemo(() => {
    return accounts.map((account) => ({
      id: account.id,
      group: account.group,
      label: account.name,
    })) as SelectOption[];
  }, [accounts]);

  const [selectedAccount, setSelectedAccount] = useState<SelectOption | null>(null);
  const [accountDeleting, setAccountDeleting] = useState(false);

  const onSelectAccount = (account: SelectOption) => {
    setSelectedAccount(account);
  };

  const handleDeleteAccount = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!selectedAccount) {
      toast.error(t("accountSelectedError"));
      return;
    }
    setAccountDeleting(true);
    try {
      await deleteAccount(currentUser?.uid, selectedAccount.id);
      setAccountsStateValue((prev) => ({
        ...prev,
        accounts: [
          ...prev.accounts.filter((account) => account.id !== selectedAccount.id),
        ],
      }));
      setOpen(false);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    setAccountDeleting(false);
  };

  return (
    <Modal onClose={() => setOpen(false)}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("deleteAccount")}</h2>
        <CloseButton onClose={() => setOpen(false)} />
        <form onSubmit={handleDeleteAccount}>
          <div className={styles.inputWrapper}>
            <Select
              placeholder={t("selectAccount").toString()}
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
                {t("selectAccount")}
              </motion.span>
            )}
          </div>
          <button
            className={styles.submitButton}
            type="submit"
            disabled={accountDeleting}
          >
            {accountDeleting ? <Spinner /> : t("delete")}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default DeleteAccount;
