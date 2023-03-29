import { Timestamp } from "firebase/firestore";

export interface Account {
  id: string;
  group: "base" | "user";
  name: string;
  balance: number;
  createdAt: Timestamp;
}

export interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  accountId: string;
  accountName: string;
  accountAmount: number;
  comment: string | null;
  createdAt: Timestamp;
}

export interface Transfer {
  id: string;
  amount: number;
  comment: string | null;
  createdAt: Timestamp;
  toAccount: Omit<Account, "createdAt" | "group">;
  fromAccount: Omit<Account, "createdAt" | "group">;
}

export interface SelectOption {
  id: string;
  group: "base" | "user";
  label: string;
}

export interface Category {
  id: string;
  label: string;
  group: "base" | "user";
  type: "income" | "expense";
  createdAt: Timestamp;
}

export type DatepickerDate = Date | null | [Date | null, Date | null];

export interface SortState {
  transcationType: string;
  dateType: string;
  amountType: string;
}
