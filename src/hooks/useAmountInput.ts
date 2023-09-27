import { useCallback, useState } from "react";
import { NumberFormatValues } from "react-number-format";
import { Amount, CurrencyOption } from "types";

const useAmountInput = (initialValue: Amount) => {
  const [amount, setAmount] = useState(initialValue);

  const handleChangeAmount = useCallback((values: NumberFormatValues) => {
    setAmount((prevAmount) => ({
      ...prevAmount,
      value: values.value,
    }));
  }, []);

  const handleChangeCurrency = useCallback((currency: CurrencyOption) => {
    setAmount((prevAmount) => ({
      ...prevAmount,
      currency,
    }));
  }, []);

  return { amount, handleChangeAmount, handleChangeCurrency } as const;
};

export default useAmountInput;
