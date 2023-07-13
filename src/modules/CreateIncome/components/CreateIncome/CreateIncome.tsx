import { useTranslation } from "react-i18next";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import { toggleCreateIncomeOpen } from "app/slices/appSlice";
import { MainPopup } from "components";
import CreateIncomeForm from "../CreateIncomeForm/CreateIncomeForm";

const CreateIncome: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const createIncomeOpen = useAppSelector((state) => state.app.createIncomeOpen);

  const handleClose = () => {
    dispatch(toggleCreateIncomeOpen(false));
  };

  return (
    <MainPopup title={t("newIncome")} isOpen={createIncomeOpen} onClose={handleClose}>
      <CreateIncomeForm onClose={handleClose} />
    </MainPopup>
  );
};

export default CreateIncome;
