import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

export const deleteAccount = async (userId: string | undefined, accountId: string) => {
  await deleteDoc(doc(db, `users/${userId}/accounts`, accountId));
};
