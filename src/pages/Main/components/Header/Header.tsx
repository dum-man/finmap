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
import Categories from "../../../../modules/Categories";
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
            onClose={() => setUserAccountMenuOpen(false)}
            parentRef={userAccountMenuRef}
            setSetUsernameOpen={setSetUsernameOpen}
          >
            <AnimatePresence initial={false} onExitComplete={() => null}>
              {setUsernameOpen && (
                <SetUsername onClose={() => setSetUsernameOpen(false)} />
              )}
            </AnimatePresence>
          </UserAccountMenu>
        )}
        {createIncomeOpen && <CreateIncome onClose={() => setCreateIncomeOpen(false)} />}
        {createExpenseOpen && (
          <CreateExpense onClose={() => setCreateExpenseOpen(false)} />
        )}
        {createTransferOpen && (
          <CreateTransfer onClose={() => setCreateTransferOpen(false)} />
        )}
        {transfersMeunOpen && (
          <TransfersMenu
            onClose={() => setTransfersMenuOpen(false)}
            parentRef={transfersMenuRef}
          />
        )}
        {settingsMenuOpen && (
          <SettingsMenu
            onClose={() => setSettingsMenuOpen(false)}
            parentRef={settingsMenuRef}
            setAccountsOpen={setAccountsOpen}
            setTransactionCategoriesOpen={setTransactionCategoriesOpen}
            setCategoryType={setCategoryType}
            setChangePasswordOpen={setChangePasswordOpen}
            setSetLanguageOpen={setSetLanguageOpen}
          >
            <AnimatePresence initial={false} onExitComplete={() => null}>
              {accountsOpen && <Accounts onClose={() => setAccountsOpen(false)} />}
              {transactionCategoriesOpen && categoryType && (
                <Categories
                  type={categoryType}
                  onClose={() => setTransactionCategoriesOpen(false)}
                />
              )}
              {changePasswordOpen && (
                <ChangePassword onClose={() => setChangePasswordOpen(false)} />
              )}
              {setLanguageOpen && (
                <SetLanguage onClose={() => setSetLanguageOpen(false)} />
              )}
            </AnimatePresence>
          </SettingsMenu>
        )}
      </AnimatePresence>
    </HeaderModule>
  );
};

export default Header;
