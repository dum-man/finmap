import { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";
import { BiTransfer } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";
import { RiExchangeLine, RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import CreateIncomeModal from "../../components/Modals/CreateIncome/CreateIncome";
import CreateExpenseModal from "../../components/Modals/CreateExpense/CreateExpense";
import CreateTransferModal from "../../components/Modals/CreateTransfer/CreateTransfer";
import TransfersMenu from "../Popovers/Transfers/Transfers";
import UserAccountPopover from "../Popovers/UserAccount/UserAccount";
import SettingsPopover from "../Popovers/Settings/Settings";
import useAppContext from "../../hooks/useAppContext";
import { auth } from "../../app/firebase";
import finmapLogoShort from "../../assets/images/finmap-logo-short.svg";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const { sidebarOpen, setSidebarOpen } = useAppContext();

  const [userAccountPopoverOpen, setUserAccountPopoverOpen] = useState(false);
  const [incomeModalOpen, setIncomeModalOpen] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [transfersMenuOpen, setTransfersMenuOpen] = useState(false);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);

  const userAccountRef = useRef(null);
  const transfersMenuRef = useRef(null);
  const settingsMenuRef = useRef(null);

  return (
    <header className={styles.header}>
      <button
        className={styles.sidebarButton}
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        {sidebarOpen ? <RiMenuFoldLine /> : <RiMenuUnfoldLine />}
      </button>
      <div className={styles.userWrapper}>
        <div className={styles.avatar}>
          <img src={finmapLogoShort} alt="finmap logo" />
        </div>
        <div>
          <p className={styles.name}>Finmap</p>
          <button
            className={styles.account}
            ref={userAccountRef}
            onClick={() => setUserAccountPopoverOpen((prev) => !prev)}
          >
            {currentUser?.displayName || t("accountType")}
            <TiArrowSortedDown
              className={userAccountPopoverOpen ? styles.rotate : ""}
              size={18}
            />
          </button>
        </div>
      </div>
      <ul className={styles.transactionButtons}>
        <li>
          <button
            className={`${styles.transactionButton} ${styles.buttonIncome}`}
            onClick={() => setIncomeModalOpen(true)}
          >
            <FiPlus />
            <span>{t("income")}</span>
          </button>
        </li>
        <li>
          <button
            className={`${styles.transactionButton} ${styles.buttonExpense}`}
            onClick={() => setExpenseModalOpen(true)}
          >
            <FiMinus />
            <span>{t("expense")}</span>
          </button>
        </li>
        <li>
          <button
            className={`${styles.transactionButton} ${styles.buttonTransfer}`}
            onClick={() => setTransferModalOpen(true)}
          >
            <BiTransfer />
            <span>{t("transfer")}</span>
          </button>
        </li>
      </ul>
      <ul className={styles.menuButtons}>
        <li>
          <button
            className={`${styles.menuButton} ${
              transfersMenuOpen ? styles.buttonActive : ""
            }`}
            ref={transfersMenuRef}
            onClick={() => setTransfersMenuOpen((prev) => !prev)}
          >
            <RiExchangeLine />
          </button>
        </li>
        <li>
          <button
            className={`${styles.menuButton} ${
              settingsMenuOpen ? styles.buttonActive : ""
            }`}
            ref={settingsMenuRef}
            onClick={() => setSettingsMenuOpen((prev) => !prev)}
          >
            <IoSettingsOutline />
          </button>
        </li>
      </ul>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {userAccountPopoverOpen && (
          <UserAccountPopover
            setOpen={setUserAccountPopoverOpen}
            parentRef={userAccountRef}
          />
        )}
        {incomeModalOpen && <CreateIncomeModal setOpen={setIncomeModalOpen} />}
        {expenseModalOpen && <CreateExpenseModal setOpen={setExpenseModalOpen} />}
        {transfersMenuOpen && (
          <TransfersMenu setOpen={setTransfersMenuOpen} parentRef={transfersMenuRef} />
        )}
        {transferModalOpen && <CreateTransferModal setOpen={setTransferModalOpen} />}
        {settingsMenuOpen && (
          <SettingsPopover setOpen={setSettingsMenuOpen} parentRef={settingsMenuRef} />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
