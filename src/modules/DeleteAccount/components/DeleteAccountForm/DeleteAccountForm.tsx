import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { Button } from "../../../../ui";
import { AccountSelect } from "../../../../components";
import { useDeleteAccountMutation } from "../../../../app/services/accountApi";
import { auth } from "../../../../firebase";
import { SelectOption } from "../../../../types";

interface DeleteAccountFormProps {
  onClose: () => void;
}

const DeleteAccountForm: React.FC<DeleteAccountFormProps> = ({ onClose }) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();

  const [selectedAccount, setSelectedAccount] = useState<SelectOption | null>(null);

  const onSelectAccount = (account: SelectOption) => {
    setSelectedAccount(account);
  };

  const handleDeleteAccount = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!currentUser) {
      return;
    }

    if (!selectedAccount) {
      toast.error(t("accountSelectedError"));
      return;
    }
    try {
      await deleteAccount({
        userId: currentUser.uid,
        accountId: selectedAccount.id,
      }).unwrap();
      onClose();
    } catch (error: any) {
      console.log(error.message);
      toast(error.message);
    }
  };

  return (
    <form onSubmit={handleDeleteAccount}>
      <AccountSelect
        placeholder={t("selectAccount")}
        value={selectedAccount}
        onChange={onSelectAccount}
      />
      <Button type="submit" variant="orange" loading={isLoading}>
        {t("delete")}
      </Button>
    </form>
  );
};

export default DeleteAccountForm;
