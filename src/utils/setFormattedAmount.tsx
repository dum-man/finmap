const currencyForamt = new Intl.NumberFormat("en-US");

export const setFormattedAmount = (amount: number) => {
  const [intValue, floatValue] = amount.toFixed(2).split(".");

  const formattedIntValue = currencyForamt.format(+intValue).replace(/,/g, "  ");

  if (Number(floatValue) === 0) {
    return <span>$ {formattedIntValue}</span>;
  }
  return (
    <span>
      $ {formattedIntValue}
      <span style={{ fontSize: "0.8em" }}>.{floatValue}</span>
    </span>
  );
};
