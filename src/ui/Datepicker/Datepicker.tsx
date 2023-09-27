import Calendar, { CalendarProps } from "react-calendar";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./DatePicker.module.css";
import "./datePicker.css";

interface DatePickerProps extends CalendarProps {}

const DatePicker: React.FC<DatePickerProps> = (props) => {
  return (
    <Calendar
      prevLabel={<IoIosArrowBack />}
      prev2Label={<HiChevronDoubleLeft />}
      nextLabel={<IoIosArrowBack className={styles["rotate"]} />}
      next2Label={<HiChevronDoubleLeft className={styles["rotate"]} />}
      {...props}
    />
  );
};

export default DatePicker;
