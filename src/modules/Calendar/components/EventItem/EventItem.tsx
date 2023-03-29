import { setFormattedAmount } from "../../../../utils/setFormattedAmount";
import styles from "./EventItem.module.scss";

interface Event {
  title: string;
  balance: number;
  type: string;
  start: Date;
  end: Date;
}

interface EventItemProps {
  event: Event;
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  const { type, balance } = event;

  return (
    <div
      className={`${styles.event} ${type === "income" ? styles.income : styles.expense}`}
    >
      {type === "income" && <div>+ {setFormattedAmount(balance)}</div>}
      {type === "expense" && <div>- {setFormattedAmount(balance)}</div>}
    </div>
  );
};

export default EventItem;
