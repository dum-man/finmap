import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { Account } from "../../types";

export const getAccounts = async (userId: string | undefined): Promise<Account[]> => {
  const accountsDocs = await getDocs(
    query(collection(db, `users/${userId}/accounts`), orderBy("balance", "desc"))
  );
  const accountsData = accountsDocs.docs.map((doc) => doc.data() as Account);
  return accountsData;
};

export const createAccount = async (userId: string | undefined, account: Account) => {
  const accountDocs = await getDocs(
    query(collection(db, `users/${userId}/accounts`), where("name", "==", account.name))
  );
  if (accountDocs.empty) {
    await setDoc(doc(db, `users/${userId}/accounts/${account.id}`), account);
  } else {
    throw new Error(`You already have "${account.name}" account`);
  }
};

export const deleteAccount = async (userId: string | undefined, accountId: string) => {
  await deleteDoc(doc(db, `users/${userId}/accounts`, accountId));
};
