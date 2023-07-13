import { useTranslation } from "react-i18next";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import { toggleCreateExpenseOpen } from "app/slices/appSlice";
import { MainPopup } from "components";
import CreateExpenseForm from "../CreateExpenseForm/CreateExpenseForm";

const CreateExpense: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const createExpenseOpen = useAppSelector((state) => state.app.createExpenseOpen);

  const handleClose = () => {
    dispatch(toggleCreateExpenseOpen(false));
  };

  return (
    <MainPopup title={t("newExpense")} isOpen={createExpenseOpen} onClose={handleClose}>
      <CreateExpenseForm onClose={handleClose} />
    </MainPopup>
  );
};

export default CreateExpense;
