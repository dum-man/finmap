import { useState } from "react";
import { NumberFormatValues } from "react-number-format";

const useAmountInput = (initialValue: string) => {
  const [amount, setAmount] = useState(initialValue);

  const onChangeAmount = (values: NumberFormatValues) => {
    setAmount(values.value);
  };

  return [amount, onChangeAmount] as const;
};

export default useAmountInput;
