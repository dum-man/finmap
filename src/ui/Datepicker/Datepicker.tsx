import Calendar, { CalendarProps } from "react-calendar";
import { motion } from "framer-motion";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { MODAL_VARIANTS } from "../../app/constants";
import styles from "./Datepicker.module.scss";
import "./datepicker.css";

interface DatepickerProps extends CalendarProps {
  onClose: () => void;
}

const Datepicker: React.FC<DatepickerProps> = (props) => {
  const { onClose, ...restProps } = props;

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
          prevLabel={<IoIosArrowBack />}
          prev2Label={<HiChevronDoubleLeft />}
          nextLabel={<IoIosArrowBack className={styles.rotate} />}
          next2Label={<HiChevronDoubleLeft className={styles.rotate} />}
          {...restProps}
        />
      </motion.div>
    </motion.div>
  );
};

export default Datepicker;
