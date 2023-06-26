import { useState } from "react";
import Calendar from "../../../../modules/Calendar";
import Charts from "../../../../modules/Charts";
import Navigation from "../../../../modules/Navigation";
import Transactions from "../../../../modules/Transactions";
import { TabType } from "../../../../types";
import styles from "./Board.module.scss";

const Board: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>("actions");

  return (
    <section className={styles.wrapper}>
      <Navigation selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === "actions" && <Transactions />}
      {selectedTab === "analytics" && <Charts />}
      {selectedTab === "calendar" && <Calendar />}
    </section>
  );
};

export default Board;
