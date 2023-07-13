import { useTranslation } from "react-i18next";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import { toggleCreateAccountOpen } from "app/slices/appSlice";
import { MainPopup } from "components";
import CreateAccountForm from "../CreateAccountForm/CreateAccountForm";

const CreateAccount: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const createAccountOpen = useAppSelector((state) => state.app.createAccountOpen);

  const handleClose = () => {
    dispatch(toggleCreateAccountOpen(false));
  };

  return (
    <MainPopup title={t("addAccount")} isOpen={createAccountOpen} onClose={handleClose}>
      <CreateAccountForm onClose={handleClose} />
    </MainPopup>
  );
};

export default CreateAccount;
