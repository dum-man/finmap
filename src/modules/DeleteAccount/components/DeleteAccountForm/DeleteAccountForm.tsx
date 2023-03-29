import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { useSetRecoilState } from "recoil";
import toast from "react-hot-toast";
import { Button } from "../../../../ui";
import { AccountSelect } from "../../../../components";
import { deleteAccount } from "../../api";
import { accountsState } from "../../../../app/atoms/accountsAtom";
import { SelectOption } from "../../../../types";
import { auth } from "../../../../firebase";

interface DeleteAccountFormProps {
  onClose: () => void;
}

const DeleteAccountForm: React.FC<DeleteAccountFormProps> = ({ onClose }) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const setAccountsStateValue = useSetRecoilState(accountsState);

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
      onClose();
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    setAccountDeleting(false);
  };
  return (
    <form onSubmit={handleDeleteAccount}>
      <AccountSelect
        placeholder={t("selectAccount")}
        value={selectedAccount}
        onChange={onSelectAccount}
      />
      <Button type="submit" variant="orange" loading={accountDeleting}>
        {t("delete")}
      </Button>
    </form>
  );
};

export default DeleteAccountForm;
