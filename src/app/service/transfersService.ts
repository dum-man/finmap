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
import { Transfer } from "../../types";

export const getTransfers = async (userId: string | undefined): Promise<Transfer[]> => {
  const accountsDocs = await getDocs(
    query(collection(db, `users/${userId}/transfers`), orderBy("createdAt", "desc"))
  );
  const accountsData = accountsDocs.docs.map((doc) => doc.data() as Transfer);
  return accountsData;
};

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

export const cancelTransfer = async (userId: string | undefined, transfer: Transfer) => {
  const batch = writeBatch(db);

  batch.delete(doc(db, `users/${userId}/transfers/${transfer.id}`));

  batch.update(doc(db, `users/${userId}/accounts/${transfer.fromAccount.id}`), {
    balance: increment(transfer.amount),
  });

  batch.update(doc(db, `users/${userId}/accounts/${transfer.toAccount.id}`), {
    balance: increment(-transfer.amount),
  });

  await batch.commit();
};
