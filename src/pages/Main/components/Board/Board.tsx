import useAppContext from "../../../../hooks/useAppContext";
import Calendar from "../../../../modules/Calendar";
import Charts from "../../../../modules/Charts";
import Navigation from "../../../../modules/Navigation";
import Transactions from "../../../../modules/Transactions";
import styles from "./Board.module.scss";

const Board: React.FC = () => {
  const { selectedTab } = useAppContext();

  return (
    <section className={styles.wrapper}>
      <Navigation />
      {selectedTab === "actions" && <Transactions />}
      {selectedTab === "analytics" && <Charts />}
      {selectedTab === "calendar" && <Calendar />}
    </section>
  );
};

export default Board;
