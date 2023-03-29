import { useMemo } from "react";
import { Calendar as ReactBigCalendar, dayjsLocalizer } from "react-big-calendar";
import { useRecoilValue } from "recoil";
import dayjs from "dayjs";
import EventItem from "../EventItem/EventItem";
import { transactionsState } from "../../../../app/atoms/transactionsAtom";
import { getTransactionEvents } from "../../helpers";
import styles from "./Calendar.module.scss";
import "./calendar.css";

const Calendar: React.FC = () => {
  const localizer = dayjsLocalizer(dayjs);

  const { transactions } = useRecoilValue(transactionsState);

  const events = useMemo(() => {
    return getTransactionEvents(transactions);
  }, [transactions]);

  return (
    <div className={styles.wrapper}>
      <h2 className="visually-hidden">Calendar</h2>
      <ReactBigCalendar
        localizer={localizer}
        formats={{ dateFormat: "D" }}
        defaultView="month"
        drilldownView="month"
        components={{ event: EventItem }}
        events={events}
      />
    </div>
  );
};

export default Calendar;
