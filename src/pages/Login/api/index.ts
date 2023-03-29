import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, runTransaction, Timestamp } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { auth, db } from "../../../firebase";
import { Account } from "../../../types";
import { DEFAULT_ACCOUNTS, DEFAULT_CATEGORIES } from "../../../app/constants";

const signInWithGoogle = async () => {
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

export default signInWithGoogle;
