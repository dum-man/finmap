import { useState } from "react";
import { CalendarProps } from "react-calendar";
import classNames from "classnames";
import { CalendarDatePicker } from "components";
import { InputLabel } from "ui";
import { setFormattedDateTime } from "utils/dateUtils";
import styles from "./DateInput.module.css";

interface DateInputProps extends CalendarProps {
  label: string;
  date: Date;
}

const DateInput: React.FC<DateInputProps> = ({ label, date, ...restProps }) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const handleDatePickerOpen = () => {
    setDatePickerOpen(true);
  };

  const handleDatePickerClose = () => {
    setDatePickerOpen(false);
  };

  return (
    <>
      <div className={styles["wrapper"]}>
        <InputLabel
          id="datePicker"
          label={label}
          isActive={Boolean(date)}
          onClick={handleDatePickerOpen}
        />
        <div
          className={classNames("input", styles["input"])}
          tabIndex={0}
          onClick={handleDatePickerOpen}
        >
          {setFormattedDateTime(date)}
        </div>
      </div>
      <CalendarDatePicker
        isOpen={datePickerOpen}
        value={date}
        onClickDay={handleDatePickerClose}
        onClose={handleDatePickerClose}
        {...restProps}
      />
    </>
  );
};

export default DateInput;
