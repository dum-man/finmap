import { useCallback, useState } from "react";
import { NumberFormatValues } from "react-number-format";

const useAmountInput = (initialValue: string) => {
  const [amount, setAmount] = useState(initialValue);

  const handleChangeAmount = useCallback((values: NumberFormatValues) => {
    setAmount(values.value);
  }, []);

  return [amount, handleChangeAmount] as const;
};

export default useAmountInput;
