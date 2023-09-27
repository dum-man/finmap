import { useId, useState } from "react";
import {
  NumberFormatValues,
  NumericFormat,
  NumericFormatProps,
} from "react-number-format";
import classNames from "classnames";
import { InputLabel, Select } from "ui";
import { CURRENCY_OPTIONS } from "app/constants";
import { CurrencyOption } from "types";
import styles from "./AmountInput.module.css";

interface AmountInputProps extends NumericFormatProps {
  label: string;
  value: string;
  onValueChange: (values: NumberFormatValues) => void;
  currency: CurrencyOption;
  onCurrencyChange: (currency: any) => void;
}

const AmountInput: React.FC<AmountInputProps> = ({
  label,
  value,
  onValueChange,
  currency,
  onCurrencyChange,
  ...restProps
}) => {
  const inputId = useId();

  const [isActive, setIsActive] = useState(Boolean(value.length));

  const handleFocus = () => {
    if (!isActive) {
      setIsActive(true);
    }
  };

  const handleBlur = () => {
    if (!value.length) {
      setIsActive(false);
    }
  };

  return (
    <div className={styles["wrapper"]}>
      <InputLabel id={inputId} label={label} isActive={isActive} />
      <NumericFormat
        className={classNames("input", styles["input"])}
        id={inputId}
        thousandSeparator=" "
        decimalScale={2}
        maxLength={13}
        allowNegative={false}
        value={parseFloat(value)}
        onValueChange={onValueChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...restProps}
      />
      <Select value={currency} onChange={onCurrencyChange} options={CURRENCY_OPTIONS} />
    </div>
  );
};
export default AmountInput;
