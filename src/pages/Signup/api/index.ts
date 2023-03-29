import { doc, Timestamp, writeBatch } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { db } from "../../../firebase";
import { Account } from "../../../types";
import { DEFAULT_ACCOUNTS, DEFAULT_CATEGORIES } from "../../../app/constants";

const createUserDocument = async (userId: string, email: string | null) => {
  const batch = writeBatch(db);

  batch.set(doc(db, `users/${userId}`), {
    userId,
    email,
  });

  DEFAULT_ACCOUNTS.forEach((name) => {
    const account: Account = {
      id: uuidv4(),
      group: "base",
      name,
      balance: 0,
      createdAt: Timestamp.now(),
    };
    batch.set(doc(db, `users/${userId}/accounts/${account.id}`), account);
  });

  DEFAULT_CATEGORIES.forEach((item) => {
    const category = {
      id: uuidv4(),
      group: "base",
      type: item.type,
      label: item.label,
      createdAt: Timestamp.now(),
    };
    batch.set(doc(db, `users/${userId}/categories/${category.id}`), category);
  });

  await batch.commit();
};

export default createUserDocument;
