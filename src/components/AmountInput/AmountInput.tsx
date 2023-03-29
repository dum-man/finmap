import { motion } from "framer-motion";
import {
  NumberFormatValues,
  NumericFormat,
  NumericFormatProps,
} from "react-number-format";
import { INPUT_LABEL_VARIANTS } from "../../app/constants";
import styles from "./AmountInput.module.scss";

interface AmountInputProps extends NumericFormatProps {
  placeholder: string;
  value: string;
  onValueChange: (values: NumberFormatValues) => void;
}

const AmountInput: React.FC<AmountInputProps> = (props) => {
  const { placeholder, value, onValueChange, ...restProps } = props;

  return (
    <div className={styles.inputWrapper}>
      <NumericFormat
        className={`${styles.input} ${value ? styles.active : ""}`}
        id="amount"
        placeholder={placeholder}
        thousandSeparator=" "
        decimalScale={2}
        maxLength={13}
        allowNegative={false}
        value={parseFloat(value)}
        onValueChange={onValueChange}
        {...restProps}
      />
      {value && (
        <motion.label
          className={styles.label}
          htmlFor="amount"
          variants={INPUT_LABEL_VARIANTS}
          initial="hidden"
          animate="visible"
        >
          {placeholder}
        </motion.label>
      )}
      <span className={styles.currency}>USD ($)</span>
    </div>
  );
};
export default AmountInput;
