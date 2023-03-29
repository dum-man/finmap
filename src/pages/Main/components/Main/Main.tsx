import AppLayout from "../../../../layouts/AppLayout/AppLayout";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Board from "../Board/Board";
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
    </AppLayout>
  );
};

export default Main;
