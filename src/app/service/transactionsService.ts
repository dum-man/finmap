import {
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase";
import { Transaction } from "../../types";

export const getTransactions = async (
  userId: string | undefined
): Promise<Transaction[]> => {
  const transactionsDocs = await getDocs(
    query(collection(db, `users/${userId}/transactions`), orderBy("createdAt", "desc"))
  );
  const transactionsData = transactionsDocs.docs.map((doc) => doc.data() as Transaction);
  return transactionsData;
};

export const createIncomeTransaction = async (
  userId: string | undefined,
  transaction: Transaction
) => {
  const batch = writeBatch(db);

  batch.set(doc(db, `users/${userId}/transactions/${transaction.id}`), transaction);

  batch.update(doc(db, `users/${userId}/accounts/${transaction.accountId}`), {
    balance: increment(transaction.amount),
  });

  await batch.commit();
};

export const createExpenseTransaction = async (
  userId: string | undefined,
  transaction: Transaction
) => {
  const batch = writeBatch(db);

  batch.set(doc(db, `users/${userId}/transactions/${transaction.id}`), transaction);

  batch.update(doc(db, `users/${userId}/accounts/${transaction.accountId}`), {
    balance: increment(-transaction.amount),
  });

  await batch.commit();
};
