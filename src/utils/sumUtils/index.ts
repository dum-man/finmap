import { CURRENCIES_RATE, CURRENCY_SYMBOLS } from "app/constants";

export const convertCurrency = (
  amount: string | number,
  {
    accountCurrency,
    currency,
  }: {
    accountCurrency: keyof typeof CURRENCIES_RATE;
    currency: keyof typeof CURRENCIES_RATE;
  }
) => {
  const formattedAmount = parseFloat(String(amount));
  const convertedCurrency = formattedAmount * CURRENCIES_RATE[accountCurrency][currency];
  return parseFloat(convertedCurrency.toFixed(2));
};

export const setCurrencySymbol = (currency: string | undefined) => {
  if (currency) {
    return CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS];
  }
  return "";
};
