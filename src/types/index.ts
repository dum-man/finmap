import { Timestamp } from "firebase/firestore";

export type TabType = "actions" | "analytics" | "calendar";

export type CategoryType = "income" | "expense" | null;

export interface Account {
  id: string;
  group: "base" | "user";
  name: string;
  balance: number;
  currency: Currency;
  createdAt: Timestamp;
}

export interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  currency: Currency;
  category: string;
  accountId: string;
  accountName: string;
  accountAmount: number;
  accountCurrency: Currency;
  comment: string | null;
  createdAt: Timestamp;
}

export interface Transfer {
  id: string;
  amount: number;
  currency: Currency;
  comment: string | null;
  createdAt: Timestamp;
  toAccount: Omit<Account, "createdAt" | "group">;
  fromAccount: Omit<Account, "createdAt" | "group">;
}

export interface Amount {
  value: string;
  currency: CurrencyOption;
}

export interface CurrencyOption extends SelectOption {
  id: Currency;
}

export type Currency = "usd" | "rub" | "kzt";

export interface SelectOption {
  id: string;
  label: string;
  group?: string;
  currency?: Currency;
}

export interface Category {
  id: string;
  label: string;
  group: "base" | "user";
  type: "income" | "expense";
  createdAt: Timestamp;
}

export type DatePickerDate = Date | null | [Date | null, Date | null];

export interface SortState {
  transactionType: string;
  dateType: string;
  amountType: string;
}
