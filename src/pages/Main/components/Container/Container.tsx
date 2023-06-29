import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { RootState } from "app/store";
import CreateIncome from "modules/CreateIncome";
import Accounts from "modules/Accounts";
import ChangePassword from "modules/ChangePassword";
import CreateAccount from "modules/CreateAccount";
import CreateExpense from "modules/CreateExpense";
import CreateTransfer from "modules/CreateTransfer";
import DeleteAccount from "modules/DeleteAccount";
import SetLanguage from "modules/SetLanguage";
import SetUsername from "modules/SetUsername";
import UserAccountMenu from "modules/UserAccountMenu";
import TransfersMenu from "modules/TransfersMenu";
import SettingsMenu from "modules/SettingsMenu";
import TransactionCategories from "modules/TransactionCategories";

const Container: React.FC = () => {
  const {
    createAccountOpen,
    deleteAccountOpen,
    createIncomeOpen,
    createExpenseOpen,
    createTransferOpen,
    setUsernameOpen,
    accountsOpen,
    changePasswordOpen,
    setLanguageOpen,
    transactionCategoriesOpen,
  } = useSelector((state: RootState) => state.app);

  return (
    <>
      <UserAccountMenu />
      <TransfersMenu />
      <SettingsMenu />
      <AnimatePresence>
        {setUsernameOpen && <SetUsername />}
        {createIncomeOpen && <CreateIncome />}
        {createExpenseOpen && <CreateExpense />}
        {createTransferOpen && <CreateTransfer />}
        {accountsOpen && <Accounts />}
        {transactionCategoriesOpen && <TransactionCategories />}
        {changePasswordOpen && <ChangePassword />}
        {setLanguageOpen && <SetLanguage />}
        {createAccountOpen && <CreateAccount />}
        {deleteAccountOpen && <DeleteAccount />}
      </AnimatePresence>
    </>
  );
};

export default Container;
