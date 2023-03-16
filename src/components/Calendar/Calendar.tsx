import { useCallback, useMemo } from "react";
import { Calendar as ReactCalendar, dayjsLocalizer } from "react-big-calendar";
import { useRecoilValue } from "recoil";
import dayjs from "dayjs";
import { transactionsState } from "../../app/atoms/transactionsAtom";
import { setFormattedAmount } from "../../utils";
import { isDaysSame } from "../../utils/dateUtils";
import styles from "./Calendar.module.scss";
import "./calendar.css";

interface EventItem {
  title: string;
  balance: number;
  type: string;
  start: Date;
  end: Date;
}

interface Event {
  event: EventItem;
}

const Calendar: React.FC = () => {
  const localizer = dayjsLocalizer(dayjs);

  const { transactions } = useRecoilValue(transactionsState);

  const events = useMemo(() => {
    return transactions.reduce<EventItem[]>((acc, current) => {
      const currentDate = current.createdAt.toDate();

      const prev = acc.find(
        (item: EventItem) =>
          isDaysSame(item.start, currentDate) && item.type === current.type
      );

      if (prev) {
        prev.balance += current.amount;
        return acc;
      }

      const map = {
        title: current.accountName,
        balance: current.amount,
        type: current.type,
        start: currentDate,
        end: currentDate,
      };
      acc.push(map);

      return acc;
    }, []);
  }, [transactions]);

  const EventComponent = useCallback(({ event }: Event) => {
    const { type, balance } = event;

    return (
      <div
        className={`${styles.event} ${
          type === "income" ? styles.income : styles.expense
        }`}
      >
        {type === "income" && <div>+ {setFormattedAmount(balance)}</div>}
        {type === "expense" && <div>- {setFormattedAmount(balance)}</div>}
      </div>
    );
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2 className="visually-hidden">Calendar</h2>
      <ReactCalendar
        localizer={localizer}
        formats={{ dateFormat: "D" }}
        defaultView="month"
        drilldownView="month"
        components={{ event: EventComponent }}
        events={events}
      />
    </div>
  );
};

export default Calendar;
