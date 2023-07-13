import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarProps } from "react-calendar";
import classNames from "classnames";
import { CalendarDatepicker } from "..";
import { INPUT_LABEL_VARIANTS } from "app/constants";
import { setFormattedDateTime } from "utils";
import styles from "./DateInput.module.scss";

interface DateInputProps extends CalendarProps {
  placeholder: string;
  date: Date;
}

const DateInput: React.FC<DateInputProps> = ({ placeholder, date, ...restProps }) => {
  const [datepickerOpen, setDatepickerOpen] = useState(false);

  const handleDatepickerOpen = () => {
    setDatepickerOpen(true);
  };

  const handleDatepickerClose = () => {
    setDatepickerOpen(false);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div
          className={classNames(styles.input, {
            [styles.focused]: datepickerOpen,
          })}
          tabIndex={0}
          onClick={handleDatepickerOpen}
        >
          {setFormattedDateTime(date)}
        </div>
        <motion.label
          className={styles.label}
          variants={INPUT_LABEL_VARIANTS}
          initial="hidden"
          animate="visible"
        >
          {placeholder}
        </motion.label>
      </div>
      <CalendarDatepicker
        isOpen={datepickerOpen}
        value={date}
        onClickDay={handleDatepickerClose}
        onClose={handleDatepickerClose}
        {...restProps}
      />
    </>
  );
};

export default DateInput;
