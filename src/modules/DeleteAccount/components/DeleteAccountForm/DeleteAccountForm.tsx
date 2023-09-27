import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { Button } from "ui";
import { AccountSelect } from "components";
import useSelectInput from "hooks/useSelectInput";
import { useDeleteAccountMutation } from "app/services/accountApi";
import { auth } from "app/config";

interface DeleteAccountFormProps {
  onClose: () => void;
}

const DeleteAccountForm: React.FC<DeleteAccountFormProps> = ({ onClose }) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();

  const [selectedAccount, onChangeAccount] = useSelectInput(null);

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
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast(error.message);
      }
    }
  };

  return (
    <form onSubmit={handleDeleteAccount}>
      <AccountSelect
        label={t("selectAccount")}
        value={selectedAccount}
        onChange={onChangeAccount}
      />
      <Button type="submit" variant="orange" loading={isLoading}>
        {t("delete")}
      </Button>
    </form>
  );
};

export default DeleteAccountForm;
