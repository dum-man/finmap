import Calendar from "react-calendar";
import { OnChangeDateCallback } from "react-calendar";
import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { MODAL_VARIANTS } from "../../../app/constants";
import { DatepickerDate } from "../../../types";
import styles from "./Datepicker.module.scss";
import "./datepicker.css";

interface DatepickerProps {
  selectRange?: boolean;
  value: DatepickerDate;
  onChange: OnChangeDateCallback;
  onClickDay?: () => void;
  onClose: () => void;
}

const Datepicker: React.FC<DatepickerProps> = ({
  selectRange = false,
  value,
  onChange,
  onClickDay,
  onClose,
}) => {
  return (
    <motion.div
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.container}
        variants={MODAL_VARIANTS}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(evt) => evt.stopPropagation()}
      >
        <Calendar
          selectRange={selectRange}
          value={value}
          onChange={onChange}
          onClickDay={onClickDay}
          prevLabel={<IoIosArrowBack />}
          prev2Label={<HiChevronDoubleLeft />}
          nextLabel={<IoIosArrowBack className={styles.rotate} />}
          next2Label={<HiChevronDoubleLeft className={styles.rotate} />}
        />
      </motion.div>
    </motion.div>
  );
};

export default Datepicker;
