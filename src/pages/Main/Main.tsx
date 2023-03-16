import AppLayout from "../../layouts/AppLayout/AppLayout";
import Board from "../../components/Board/Board";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
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
