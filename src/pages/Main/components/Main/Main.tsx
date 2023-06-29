import { AppLayout } from "layouts";
import Header from "modules/Header";
import Sidebar from "modules/Sidebar";
import Board from "../Board/Board";
import Container from "../Container/Container";
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
      <Container />
    </AppLayout>
  );
};

export default Main;
