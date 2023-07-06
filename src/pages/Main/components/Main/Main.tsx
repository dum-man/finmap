import { AppLayout } from "layouts";
import Header from "modules/Header";
import Sidebar from "modules/Sidebar";
import Board from "../Board/Board";
import Accounts from "modules/Accounts";
import Categories from "modules/Categories";
import ChangePassword from "modules/ChangePassword";
import CreateAccount from "modules/CreateAccount";
import CreateExpense from "modules/CreateExpense";
import CreateIncome from "modules/CreateIncome";
import CreateTransfer from "modules/CreateTransfer";
import DeleteAccount from "modules/DeleteAccount";
import SetLanguage from "modules/SetLanguage";
import SetUsername from "modules/SetUsername";
import SettingsMenu from "modules/SettingsMenu";
import TransfersMenu from "modules/TransfersMenu";
import UserAccountMenu from "modules/UserAccountMenu";
import styles from "./Main.module.scss";

const Main: React.FC = () => {
  return (
    <AppLayout>
      <h1 className="visually-hidden">Finmap</h1>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <Board />
      </div>
      <CreateAccount />
      <DeleteAccount />
      <UserAccountMenu />
      <TransfersMenu />
      <SettingsMenu />
      <SetUsername />
      <CreateIncome />
      <CreateExpense />
      <CreateTransfer />
      <Accounts />
      <Categories />
      <ChangePassword />
      <SetLanguage />
    </AppLayout>
  );
};

export default Main;
