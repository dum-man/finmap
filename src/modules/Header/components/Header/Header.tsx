import { MutableRefObject } from "react";
import MenuButtons from "../MenuButtons/MenuButtons";
import SidebarButton from "../SidebarButton/SidebarButton";
import TransactionButtons from "../TransactionButtons/TransactionButtons";
import UserInfo from "../UserInfo/UserInfo";
import styles from "./Header.module.scss";

interface HeaderProps {
  userAccountMenuRef: MutableRefObject<null>;
  userAccountMenuOpen: boolean;
  setUserAccountMenuOpen: (open: React.SetStateAction<boolean>) => void;
  setCreateIncomeOpen: (open: React.SetStateAction<boolean>) => void;
  setCreateExpenseOpen: (open: React.SetStateAction<boolean>) => void;
  setCreateTransferOpen: (open: React.SetStateAction<boolean>) => void;
  setTransfersMenuOpen: (open: React.SetStateAction<boolean>) => void;
  setSettingsMenuOpen: (open: React.SetStateAction<boolean>) => void;
  transfersMenuRef: MutableRefObject<null>;
  settingsMenuRef: MutableRefObject<null>;
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  userAccountMenuRef,
  userAccountMenuOpen,
  setUserAccountMenuOpen,
  setCreateIncomeOpen,
  setCreateExpenseOpen,
  setCreateTransferOpen,
  setTransfersMenuOpen,
  setSettingsMenuOpen,
  transfersMenuRef,
  settingsMenuRef,
  children,
}) => {
  return (
    <header className={styles.wrapper}>
      <SidebarButton />
      <UserInfo
        parentRef={userAccountMenuRef}
        open={userAccountMenuOpen}
        setOpen={setUserAccountMenuOpen}
      />
      <TransactionButtons
        setCreateIncomeOpen={setCreateIncomeOpen}
        setCreateExpenseOpen={setCreateExpenseOpen}
        setCreateTransferOpen={setCreateTransferOpen}
      />
      <MenuButtons
        setTransfersMenuOpen={setTransfersMenuOpen}
        setSettingsMenuOpen={setSettingsMenuOpen}
        transfersMenuRef={transfersMenuRef}
        settingsMenuRef={settingsMenuRef}
      />
      {children}
    </header>
  );
};

export default Header;
