import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  doc,
  runTransaction,
  Timestamp,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { Account } from "../../types";
import { DEFAULT_ACCOUNTS, DEFAULT_CATEGORIES } from "../constants";
import { auth, db } from "../firebase";

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const data = await signInWithPopup(auth, provider);

  if (data) {
    const { uid, email } = data.user;
    const userDocRef = doc(db, `users/${uid}`);
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userDocRef);
      if (userDoc.exists()) {
        return;
      } else {
        DEFAULT_ACCOUNTS.forEach((name) => {
          const account: Account = {
            id: uuidv4(),
            group: "base",
            name,
            balance: 0,
            createdAt: Timestamp.now(),
          };
          transaction.set(doc(db, `users/${uid}/accounts/${account.id}`), account);
        });
        DEFAULT_CATEGORIES.forEach((item) => {
          const category = {
            id: uuidv4(),
            group: "base",
            type: item.type,
            label: item.label,
            createdAt: Timestamp.now(),
          };
          transaction.set(doc(db, `users/${uid}/categories/${category.id}`), category);
        });
        transaction.set(userDocRef, {
          userId: uid,
          email: email,
        });
      }
    });
  } else {
    throw new Error("Account creation failed");
  }
};

export const createUserDocument = async (userId: string, email: string | null) => {
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

export const updateUserProfile = async (
  userId: string | undefined,
  displayName: string,
  updateProfile: (profile: { displayName: string }) => Promise<boolean>
) => {
  await updateProfile({
    displayName,
  });
  await updateDoc(doc(db, `users/${userId}`), {
    displayName,
  });
};
