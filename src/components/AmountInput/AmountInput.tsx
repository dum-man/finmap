import {
  NumberFormatValues,
  NumericFormat,
  NumericFormatProps,
} from "react-number-format";
import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";
import { INPUT_LABEL_VARIANTS } from "../../app/constants";
import styles from "./AmountInput.module.scss";

interface AmountInputProps extends NumericFormatProps {
  currency?: boolean;
  placeholder: string;
  value: string;
  onValueChange: (values: NumberFormatValues) => void;
}

const AmountInput: React.FC<AmountInputProps> = ({
  currency = true,
  placeholder,
  value,
  onValueChange,
  ...restProps
}) => {
  return (
    <div className={styles.wrapper}>
      <NumericFormat
        className={classNames(styles.input, { [styles.active]: !!value })}
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
      <AnimatePresence initial={false}>
        {!!value && (
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
      </AnimatePresence>
      {currency && <span className={styles.currency}>USD ($)</span>}
    </div>
  );
};
export default AmountInput;
