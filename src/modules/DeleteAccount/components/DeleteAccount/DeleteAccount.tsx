import { useTranslation } from "react-i18next";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import { MainPopup } from "components";
import { toggleDeleteAccountOpen } from "app/slices/appSlice";
import DeleteAccountForm from "../DeleteAccountForm/DeleteAccountForm";

const DeleteAccount: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const deleteAccountOpen = useAppSelector((state) => state.app.deleteAccountOpen);

  const handleClose = () => {
    dispatch(toggleDeleteAccountOpen(false));
  };

  return (
    <MainPopup
      title={t("deleteAccount")}
      isOpen={deleteAccountOpen}
      onClose={handleClose}
    >
      <DeleteAccountForm onClose={handleClose} />
    </MainPopup>
  );
};

export default DeleteAccount;
