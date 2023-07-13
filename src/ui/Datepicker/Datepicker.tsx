import Calendar, { CalendarProps } from "react-calendar";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./Datepicker.module.scss";
import "./datepicker.css";

interface DatepickerProps extends CalendarProps {}

const Datepicker: React.FC<DatepickerProps> = (props) => {
  return (
    <Calendar
      prevLabel={<IoIosArrowBack />}
      prev2Label={<HiChevronDoubleLeft />}
      nextLabel={<IoIosArrowBack className={styles.rotate} />}
      next2Label={<HiChevronDoubleLeft className={styles.rotate} />}
      {...props}
    />
  );
};

export default Datepicker;
