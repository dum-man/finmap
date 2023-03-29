import { writeBatch, doc, increment } from "firebase/firestore";
import { db } from "../../../firebase";
import { Transfer } from "../../../types";

export const createTransfer = async (userId: string | undefined, transfer: Transfer) => {
  const batch = writeBatch(db);

  batch.set(doc(db, `users/${userId}/transfers/${transfer.id}`), transfer);

  batch.update(doc(db, `users/${userId}/accounts/${transfer.fromAccount.id}`), {
    balance: increment(-transfer.amount),
  });

  batch.update(doc(db, `users/${userId}/accounts/${transfer.toAccount.id}`), {
    balance: increment(transfer.amount),
  });

  await batch.commit();
};
