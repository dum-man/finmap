import { SetStateAction, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Datepicker } from "../../ui";
import { INPUT_LABEL_VARIANTS } from "../../app/constants";
import { setFormattedDateTime } from "../../utils";
import styles from "./DateInput.module.scss";

interface DateInputProps {
  placeholder: string;
  date: Date;
  setDate: (date: SetStateAction<Date>) => void;
}

const DateInput: React.FC<DateInputProps> = ({ placeholder, date, setDate }) => {
  const [datepickerOpen, setDatepickerOpen] = useState(false);

  return (
    <div className={styles.inputWrapper}>
      <div
        className={`${styles.input} ${datepickerOpen ? styles.focused : ""}`}
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
            onChange={setDate}
            onClickDay={() => setDatepickerOpen(false)}
            onClose={() => setDatepickerOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DateInput;
