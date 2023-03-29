import { AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Accounts from "../../../../modules/Accounts";
import ChangePassword from "../../../../modules/ChangePassword";
import CreateExpense from "../../../../modules/CreateExpense";
import CreateIncome from "../../../../modules/CreateIncome";
import CreateTransfer from "../../../../modules/CreateTransfer";
import HeaderModule from "../../../../modules/Header";
import SetLanguage from "../../../../modules/SetLanguage";
import SettingsMenu from "../../../../modules/SettingsMenu";
import SetUsername from "../../../../modules/SetUsername";
import TransactionCategories from "../../../../modules/TransactionCategories";
import TransfersMenu from "../../../../modules/TransfersMenu";
import UserAccountMenu from "../../../../modules/UserAccountMenu";

const Header: React.FC = () => {
  const [userAccountMenuOpen, setUserAccountMenuOpen] = useState(false);
  const [setUsernameOpen, setSetUsernameOpen] = useState(false);
  const [createIncomeOpen, setCreateIncomeOpen] = useState(false);
  const [createExpenseOpen, setCreateExpenseOpen] = useState(false);
  const [createTransferOpen, setCreateTransferOpen] = useState(false);
  const [transfersMeunOpen, setTransfersMenuOpen] = useState(false);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);

  const [accountsOpen, setAccountsOpen] = useState(false);
  const [transactionCategoriesOpen, setTransactionCategoriesOpen] = useState(false);
  const [categoryType, setCategoryType] = useState<"income" | "expense">();
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [setLanguageOpen, setSetLanguageOpen] = useState(false);

  const userAccountMenuRef = useRef(null);
  const transfersMenuRef = useRef(null);
  const settingsMenuRef = useRef(null);

  return (
    <HeaderModule
      userAccountMenuRef={userAccountMenuRef}
      userAccountMenuOpen={userAccountMenuOpen}
      setUserAccountMenuOpen={setUserAccountMenuOpen}
      setCreateIncomeOpen={setCreateIncomeOpen}
      setCreateExpenseOpen={setCreateExpenseOpen}
      setCreateTransferOpen={setCreateTransferOpen}
      setTransfersMenuOpen={setTransfersMenuOpen}
      setSettingsMenuOpen={setSettingsMenuOpen}
      transfersMenuRef={transfersMenuRef}
      settingsMenuRef={settingsMenuRef}
    >
      <AnimatePresence initial={false} onExitComplete={() => null}>
        {userAccountMenuOpen && (
          <UserAccountMenu
            setOpen={setUserAccountMenuOpen}
            parentRef={userAccountMenuRef}
            setSetUsernameOpen={setSetUsernameOpen}
          >
            <AnimatePresence initial={false} onExitComplete={() => null}>
              {setUsernameOpen && <SetUsername setOpen={setSetUsernameOpen} />}
            </AnimatePresence>
          </UserAccountMenu>
        )}
        {createIncomeOpen && <CreateIncome setOpen={setCreateIncomeOpen} />}
        {createExpenseOpen && <CreateExpense setOpen={setCreateExpenseOpen} />}
        {createTransferOpen && <CreateTransfer setOpen={setCreateTransferOpen} />}
        {transfersMeunOpen && (
          <TransfersMenu setOpen={setTransfersMenuOpen} parentRef={transfersMenuRef} />
        )}
        {settingsMenuOpen && (
          <SettingsMenu
            setSettingsMenuOpen={setSettingsMenuOpen}
            parentRef={settingsMenuRef}
            setAccountsOpen={setAccountsOpen}
            setTransactionCategoriesOpen={setTransactionCategoriesOpen}
            setCategoryType={setCategoryType}
            setChangePasswordOpen={setChangePasswordOpen}
            setSetLanguageOpen={setSetLanguageOpen}
          >
            <AnimatePresence initial={false} onExitComplete={() => null}>
              {accountsOpen && <Accounts setOpen={setAccountsOpen} />}
              {transactionCategoriesOpen && categoryType && (
                <TransactionCategories
                  type={categoryType}
                  setOpen={setTransactionCategoriesOpen}
                />
              )}
              {changePasswordOpen && <ChangePassword setOpen={setChangePasswordOpen} />}
              {setLanguageOpen && <SetLanguage setOpen={setSetLanguageOpen} />}
            </AnimatePresence>
          </SettingsMenu>
        )}
      </AnimatePresence>
    </HeaderModule>
  );
};

export default Header;
