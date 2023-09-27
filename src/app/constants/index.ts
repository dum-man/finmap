import { CurrencyOption, SelectOption } from "types";

export const EMAIL_FORMAT = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const DEFAULT_DATE_OPTION: SelectOption = { id: "5", label: "allTime" };

export const DATEPICKER_DATE_OPTION: SelectOption = { id: "0", label: "selectDates" };

export const CURRENCY_OPTIONS: CurrencyOption[] = [
  { id: "usd", label: "USD ($)" },
  { id: "rub", label: "RUB (₽)" },
  { id: "kzt", label: "KZT (₸)" },
];

export const CURRENCY_SYMBOLS = {
  usd: "$",
  rub: "₽",
  kzt: "₸",
};

export const CURRENCIES_RATE = {
  usd: {
    usd: 1,
    rub: 0.0103,
    kzt: 0.0021,
  },
  rub: {
    usd: 96.3,
    rub: 1,
    kzt: 0.2,
  },
  kzt: {
    usd: 473.5,
    rub: 4.92,
    kzt: 1,
  },
};

export const DEFAULT_ACCOUNTS = ["Bank account", "Savings", "Cash"];

export const DEFAULT_CATEGORIES = [
  { type: "income", group: "base", label: "Salary" },
  { type: "income", group: "base", label: "Part-time job" },
  { type: "income", group: "base", label: "Investments" },
  { type: "income", group: "base", label: "Loan repayment" },
  { type: "income", group: "base", label: "Received credit" },
  { type: "income", group: "base", label: "Financial reward" },
  { type: "expense", group: "base", label: "Taxes" },
  { type: "expense", group: "base", label: "Credit repayment" },
  { type: "expense", group: "base", label: "Rental" },
  { type: "expense", group: "base", label: "Commission" },
  { type: "expense", group: "base", label: "Dividends" },
  { type: "expense", group: "base", label: "Loan granted" },
];

export const LANGUAGES = {
  en: {
    nativeName: "English",
  },
  ru: {
    nativeName: "Русский",
  },
  kz: {
    nativeName: "Қазақ",
  },
};
