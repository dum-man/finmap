import { writeBatch, doc, increment } from "firebase/firestore";
import { db } from "../../../firebase";
import { Transaction } from "../../../types";

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
