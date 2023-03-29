import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

export const deleteCategory = async (userId: string | undefined, categoryId: string) => {
  await deleteDoc(doc(db, `users/${userId}/categories/${categoryId}`));
};
