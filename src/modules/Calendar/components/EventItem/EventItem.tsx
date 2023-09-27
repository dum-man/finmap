import classNames from "classnames";
// import { setFormattedAmount } from "utils/sumUtils/setFormattedAmount";
import styles from "./EventItem.module.css";

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
      className={classNames(styles["event"], {
        [styles["income"]]: type === "income",
        [styles["expense"]]: type === "expense",
      })}
    >
      {/* {type === "income" && <div>+ {setFormattedAmount(balance)}</div>}
      {type === "expense" && <div>- {setFormattedAmount(balance)}</div>} */}
    </div>
  );
};

export default EventItem;
