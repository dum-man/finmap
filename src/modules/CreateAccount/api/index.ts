import { getDocs, query, collection, where, setDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { Account } from "../../../types";

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
