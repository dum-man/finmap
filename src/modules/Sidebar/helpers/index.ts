import { Account, Currency, SelectOption } from "types";
import { setCurrencySymbol } from "utils/sumUtils";
import { setFormattedAmount } from "utils/sumUtils/setFormattedAmount";

export const formatSelectOption = (option: SelectOption) => ({
  ...option,
  label: setCurrencySymbol(option.id as Currency),
});

export const setFilteredAmount = (accounts: Account[], currencyCode: string) => {
  if (!accounts.length) {
    return 0;
  }
  return accounts
    .filter((account) => account.currency === currencyCode)
    .reduce((previousValue, currentValue) => previousValue + currentValue.balance, 0);
};

export const getAmountsByCurrencyCode = (accounts: Account[]) =>
  accounts.reduce<Record<string, number>>((previousValue, currentValue) => {
    if (previousValue[currentValue.currency] === undefined) {
      previousValue[currentValue.currency] = 0;
    }
    previousValue[currentValue.currency] += currentValue.balance;

    return previousValue;
  }, {});

export const setFormattedAndGroupedAmounts = (
  amountsByCurrencyCode: Record<string, number>
) =>
  Object.keys(amountsByCurrencyCode).map((currencyCode) => {
    return setFormattedAmount(amountsByCurrencyCode[currencyCode], currencyCode);
  });
