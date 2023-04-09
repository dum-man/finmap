import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Calendar as ReactBigCalendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import EventItem from "../EventItem/EventItem";
import { getTransactionEvents } from "../../helpers";
import { useGetTransactionsQuery } from "../../../../app/services/transactionApi";
import { auth } from "../../../../firebase";
import styles from "./Calendar.module.scss";
import "./calendar.css";

const Calendar: React.FC = () => {
  const localizer = dayjsLocalizer(dayjs);

  const [currentUser] = useAuthState(auth);

  const { data: transactions = [] } = useGetTransactionsQuery(currentUser?.uid as string);

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
