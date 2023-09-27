import { setCurrencySymbol } from ".";

const currencyFormat = new Intl.NumberFormat("en-US");

export const setFormattedAmount = (value: number, currency?: string) => {
  const [intValue, floatValue] = value.toFixed(2).split(".");

  const formattedIntValue = currencyFormat
    .format(Math.abs(+intValue))
    .replace(/,/g, "  ");

  return (
    <span key={currency}>
      {setCurrencySymbol(currency)} {formattedIntValue}
      <span style={{ fontSize: "0.8em" }}>.{floatValue}</span>
    </span>
  );
};
