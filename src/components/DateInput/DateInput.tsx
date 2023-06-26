import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarProps } from "react-calendar";
import classNames from "classnames";
import { Datepicker } from "../../ui";
import { INPUT_LABEL_VARIANTS } from "../../app/constants";
import { setFormattedDateTime } from "../../utils/utils";
import styles from "./DateInput.module.scss";

interface DateInputProps extends CalendarProps {
  placeholder: string;
  date: Date;
}

const DateInput: React.FC<DateInputProps> = ({ placeholder, date, ...restProps }) => {
  const [datepickerOpen, setDatepickerOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div
        className={classNames(styles.input, {
          [styles.focused]: datepickerOpen,
        })}
        onClick={() => setDatepickerOpen(true)}
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
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {datepickerOpen && (
          <Datepicker
            value={date}
            onClickDay={() => setDatepickerOpen(false)}
            onClose={() => setDatepickerOpen(false)}
            {...restProps}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DateInput;
