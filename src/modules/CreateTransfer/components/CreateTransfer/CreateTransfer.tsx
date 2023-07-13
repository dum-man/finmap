import { useTranslation } from "react-i18next";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import { MainPopup } from "components";
import { toggleCreateTransferOpen } from "app/slices/appSlice";
import CreateTransferForm from "../CreateTransferForm/CreateTransferForm";

const CreateTransfer: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const createTransferOpen = useAppSelector((state) => state.app.createTransferOpen);

  const handleClose = () => {
    dispatch(toggleCreateTransferOpen(false));
  };

  return (
    <MainPopup title={t("newTransfer")} isOpen={createTransferOpen} onClose={handleClose}>
      <CreateTransferForm onClose={handleClose} />
    </MainPopup>
  );
};

export default CreateTransfer;
